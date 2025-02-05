from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI
import os
import base64
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter 
from model import final_result

DATA_PATH = 'data/'
DB_FAISS_PATH = 'vectorstore/db_faiss'

# Create vector database
def create_vector_db():
    loader = DirectoryLoader(DATA_PATH,
                             glob='*.pdf',
                             loader_cls=PyPDFLoader)

    documents = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500,
                                                   chunk_overlap=50)
    texts = text_splitter.split_documents(documents)

    embeddings = HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2',
                                       model_kwargs={'device': 'cpu'})

    db = FAISS.from_documents(texts, embeddings)
    db.save_local(DB_FAISS_PATH)


# Load environment variables
load_dotenv()

# Create vector database if it doesn't exist
if not os.path.exists(DB_FAISS_PATH):
    create_vector_db()
    

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


client = OpenAI(
    # This is the default and can be omitted
    api_key=os.getenv("OPENAI_API_KEY"),
)

# Chat API route
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    query = data.get('query')
    prompt = final_result(query)
    print(prompt)

    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful medical assistant."},
                {"role": "user", "content": prompt}
            ]
        )

        return jsonify({"response": response.choices[0].message.content})
    
    except Exception as e:
        print(e)
        return jsonify({"error": "Error processing the request"}), 500

# Generate Speech API route
@app.route('/generate-speech', methods=['POST'])
def generate_speech():
    data = request.get_json()
    text = data.get('text')

    if not text:
        return jsonify({"error": "Text is required."}), 400

    try:
       
        mp3_response = client.audio.speech.create(
            model="tts-1",
            voice="alloy",
            input=text,
        )
        # Extract the binary content directly
        audio_bytes = mp3_response.content  # Access binary content
        audio_base64 = base64.b64encode(audio_bytes).decode('utf-8')
        
        return jsonify({"audio": f"data:audio/mp3;base64,{audio_base64}"})
    except Exception as e:
        print(e)
        return jsonify({"error": "Failed to generate speech."}), 500

# Start server
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8000))
    app.run(host='0.0.0.0', port=port)
