import React, {useState} from 'react';
import axiosInstance from "../services/axiosInterceptor";

const KidneyStonePrediction = () => {
    const [image, setImage] = useState(null);
    const [prediction, setPrediction] = useState("");

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axiosInstance.post('/medical-image/predict/kidney-stone', formData);
            setPrediction(response.data.prediction);
        } catch (error) {
            console.error('Error making prediction', error);
        }
    };

    return (
        <div className="w-full bg-gray-100 py-20">
            <div className="min-w-7xl mx-auto flex justify-center items-center">

                <input type="file" onChange={handleFileChange}/>
                <button onClick={handleSubmit}>Predict</button>
                {prediction && <p>Prediction: {prediction}</p>}
            </div>
        </div>
    );
};

export default KidneyStonePrediction;