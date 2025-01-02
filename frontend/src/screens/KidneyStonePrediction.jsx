// import React, { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import axiosInstance from "../services/axiosInterceptor";
// import { AiOutlinePlus } from "react-icons/ai";
//
// const KidneyStonePrediction = () => {
//   const [image, setImage] = useState(null);
//   const [prediction, setPrediction] = useState("");
//
//   const onDrop = (acceptedFiles) => {
//     setImage(acceptedFiles[0]);
//     setPrediction(null);
//   };
//
//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append("image", image);
//
//     try {
//       const response = await axiosInstance.post("/medical-image/predict/kidney-stone", formData);
//       setPrediction(response.data);
//     } catch (error) {
//       console.error("Error making prediction", error);
//     }
//   };
//
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: "image/*"
//   });
//
//   return (
//     <div className="w-full bg-gray-100 py-10">
//       <div className="min-w-7xl mx-auto flex flex-col justify-center items-center">
//         <h2 className="text-3xl font-bold mt-4 mb-2">
//           Kidney Stone Prediction
//         </h2>
//         <hr className="w-2/12 h-1 bg-gray-400 mb-10" />
//
//         <div className="flex w-full max-w-6xl justify-between items-start gap-10">
//           <div
//             className="w-full min-h-[400px] bg-white shadow-xl shadow-teal-100 rounded-lg p-6 mb-8 flex flex-col justify-center items-center">
//             <div
//               {...getRootProps({ className: "w-4/5 bg-white shadow-xl shadow-teal-100 rounded-lg p-6 mb-8 flex flex-col justify-center items-center border-dashed border-2 border-gray-400 hover:border-teal-500 transition-colors" })}
//             >
//               <input {...getInputProps()} />
//               <div className="flex flex-col justify-center items-center text-center">
//                 <AiOutlinePlus className="text-4xl text-teal-500 mb-2" />
//                 {
//                   isDragActive ?
//                     <p className="text-lg text-gray-700">Drop the files here ...</p> :
//                     <p className="text-lg text-gray-700">Drag 'n' drop an image here, or click to
//                       select
//                       one</p>
//                 }
//               </div>
//               {image && (
//                 <p className="mt-4 text-gray-600" title={image.name}>Selected
//                   file: {image.name.length > 25 ? image.name.slice(0, 25) + "..." : image.name}</p>
//               )}
//             </div>
//             <button
//               onClick={handleSubmit}
//               className="mt-4 px-4 py-2 bg-teal-500 hover:bg-teal-800 rounded-full text-white">
//               Predict
//             </button>
//           </div>
//
//           <div className="flex w-full min-h-[400px] bg-white shadow-xl rounded-lg p-6 mb-8 flex-col items-center">
//             {prediction && (
//               <>
//                 <img
//                   src={`data:image/jpeg;base64,${prediction.image}`}
//                   alt="Prediction Result"
//                   className="w-1/2 h-auto rounded-2xl mb-4"
//                 />
//                 <p className="text-lg font-bold">
//                   {prediction.has_stone ? "Stone Detected" : "No Stone Detected"}
//                 </p>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default KidneyStonePrediction;

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axiosInstance from "../services/axiosInterceptor";
import { AiOutlinePlus } from "react-icons/ai";

const KidneyStonePrediction = () => {
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [resultImage, setResultImage] = useState("");
  const [boundingBoxes, setBoundingBoxes] = useState([]);

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
    setPredictions([]);
    setResultImage("");
    setBoundingBoxes([]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axiosInstance.post(
        "/medical-image/predict/kidney-stone",
        formData
      );
      setPredictions(response.data.predictions);
      // setResultImage(`http://localhost:5001/${response.data.resultImagePath}`);
      setResultImage(response.data.resultImage);
      setBoundingBoxes(response.data.predictions.map(pred => pred.box || null)); // Optional, depends on Flask response
    } catch (error) {
      console.error("Error making prediction", error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*"
  });

  return (
    <div className="w-full bg-gray-100 py-10">
      <div className="min-w-7xl mx-auto flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mt-4 mb-2">Kidney Stone Prediction</h2>
        <hr className="w-2/12 h-1 bg-gray-400 mb-10" />

        <div className="flex w-full max-w-6xl justify-between items-start gap-10">
          {/* Upload Section */}
          <div
            className="w-full min-h-[400px] bg-white shadow-xl rounded-lg p-6 mb-8 flex flex-col justify-center items-center">
            <div
              {...getRootProps({
                className:
                  "w-4/5 bg-white shadow-xl rounded-lg p-6 mb-8 flex flex-col justify-center items-center border-dashed border-2 border-gray-400 hover:border-teal-500 transition-colors"
              })}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col justify-center items-center text-center">
                <AiOutlinePlus className="text-4xl text-teal-500 mb-2" />
                {isDragActive ? (
                  <p className="text-lg text-gray-700">Drop the files here ...</p>
                ) : (
                  <p className="text-lg text-gray-700">
                    Drag 'n' drop an image here, or click to select one
                  </p>
                )}
              </div>
              {image && <p className="mt-4 text-gray-600">Selected file: {image.name}</p>}
            </div>
            <button
              onClick={handleSubmit}
              className="mt-4 px-4 py-2 bg-teal-500 hover:bg-teal-800 rounded-full text-white"
            >
              Predict
            </button>
          </div>

          {/* Results Section */}
          <div
            className="flex w-full min-h-[400px] bg-white shadow-xl rounded-lg p-6 mb-8 flex-col justify-center items-center">
            {resultImage && (
              <div className="relative">
                <img
                  src={`data:image/jpeg;base64,${resultImage}`}
                  alt="Prediction Result"
                  className="w-full h-auto rounded-2xl mb-4"
                />
                {/* Optional: Draw Bounding Boxes */}
                {boundingBoxes.map((box, index) => (
                  box && (
                    <div
                      key={index}
                      style={{
                        position: "absolute",
                        top: `${box.y}px`,
                        left: `${box.x}px`,
                        width: `${box.width}px`,
                        height: `${box.height}px`,
                        border: "2px solid red",
                        pointerEvents: "none"
                      }}
                    ></div>
                  )
                ))}
              </div>
            )}
            {predictions.length > 0 && (
              <div>
                <h3 className="text-lg font-bold">Predictions:</h3>
                <ul>
                  {predictions.map((prediction, index) => (
                    <li key={index} className="text-gray-700">
                      {prediction.label} - Confidence:{" "}
                      {prediction.confidence.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidneyStonePrediction;
