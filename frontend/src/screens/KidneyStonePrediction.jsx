import React, {useState} from 'react';
import {useDropzone} from 'react-dropzone';
import axiosInstance from "../services/axiosInterceptor";
import {AiOutlinePlus} from 'react-icons/ai';

const KidneyStonePrediction = () => {
    const [image, setImage] = useState(null);
    const [prediction, setPrediction] = useState("");

    const onDrop = (acceptedFiles) => {
        setImage(acceptedFiles[0]);
        setPrediction("")
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

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: 'image/*'
    });

    return (
        <div className="w-full bg-gray-100 py-10">
            <div className="min-w-7xl mx-auto flex flex-col justify-center items-center">
                <h2 className="text-3xl font-bold mt-4 mb-2">
                    Kidney Stone Prediction
                </h2>
                <hr className="w-2/12 h-1 bg-gray-400 mb-10"/>

                <div className="flex w-full max-w-6xl justify-between items-start gap-10">
                    <div
                        className="w-full min-h-[400px] bg-white shadow-xl shadow-light-orchid rounded-lg p-6 mb-8 flex flex-col justify-center items-center">
                        <div
                            {...getRootProps({className: 'w-4/5 bg-white shadow-xl shadow-light-orchid rounded-lg p-6 mb-8 flex flex-col justify-center items-center border-dashed border-2 border-gray-400 hover:border-fuchsia-500 transition-colors'})}
                        >
                            <input {...getInputProps()} />
                            <div className="flex flex-col justify-center items-center text-center">
                                <AiOutlinePlus className="text-4xl text-fuchsia-500 mb-2"/>
                                {
                                    isDragActive ?
                                        <p className="text-lg text-gray-700">Drop the files here ...</p> :
                                        <p className="text-lg text-gray-700">Drag 'n' drop an image here, or click to
                                            select
                                            one</p>
                                }
                            </div>
                            {image && (
                                <p className="mt-4 text-gray-600">Selected file: {image.name}</p>
                            )}
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="mt-4 px-4 py-2 bg-fuchsia-500 hover:bg-fuchsia-400 rounded-full text-white rounded">
                            Predict
                        </button>
                    </div>

                    <div
                        className="flex w-full min-h-[400px] bg-white shadow-xl shadow-light-orchid rounded-lg p-6 mb-8 flex flex-col justify-center items-center">
                        {image && (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Uploaded Preview"
                                className="w-1/2 h-auto rounded-2xl mb-4"
                            />
                        )}
                        {prediction && <p className="text-lg font-bold">Prediction: {prediction}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KidneyStonePrediction;
