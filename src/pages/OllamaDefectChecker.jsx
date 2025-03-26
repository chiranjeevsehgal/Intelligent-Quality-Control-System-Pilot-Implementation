import React, { useState } from "react";
import { UploadCloud, FileImage, Menu, X, AlertTriangle } from "lucide-react";
import Sidebar from "../components/sidebar";
import ollama from "ollama";

const OllamaDefectChecker = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [noteVisible, setNoteVisible] = useState(true);

  //   To handle the image upload and create object url for it
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };


//   To make a ollama api call and classify the image
  const classifyImage = async () => {
    if (!image) return;
    setLoading(true);
    setResult(null);

    const base64Image = await toBase64(image);
    
    try {
      const response = await ollama.chat({
        model: "gemma3:latest",
        messages: [
          {
            role: "user",
            content: "Carefully analyze the provided paper image and determine whether it is 'Defective' or 'Not Defective'. Identify defects such as marks, holes, folds, discoloration, or any other inconsistencies with high precision, even for minor flaws. Provide a classification as either 'Defective' or 'Not Defective' along with the reason or detected issues. If the image is not of paper, respond with 'The uploaded image does not align with the scope of this project. Please provide an image of sheets for defect detection.' without any further analysis.",
            images: [base64Image],
          },
        ],
      });
      
      setResult(response.message.content);
    } catch (error) {
      setResult("Error analyzing the image. Please try again.");
    }
    
    setLoading(false);
  };

  //   Coverting the image to base64 format
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
    });

    // To handle the markdown response received from the model
  const renderResultWithFormatting = (text) => {
    const lines = text.split('\n');
    
    return (
      <div className="space-y-2">
        {lines.map((line, index) => {
          if (line.startsWith('**') && line.endsWith('**')) {
            return (
              <h3 key={index} className="font-bold text-lg">
                {line.replace(/\*\*/g, '')}
              </h3>
            );
          }
          
          if (line.startsWith('*')) {
            return (
              <div key={index} className="flex items-start">
                <span className="mr-2 text-gray-600">•</span>
                <span>{line.replace(/^\*\s*/, '')}</span>
              </div>
            );
          }
          
          return <p key={index}>{line}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        currentPage="/ollama" 
      />
      
      <div 
        className={`flex-1 transition-all duration-300 ease-in-out 
          ${sidebarOpen ? "md:ml-64" : "md:ml-20"}
          p-4 sm:p-6 overflow-y-auto`}
      >
        <div className="max-w-8xl mx-auto">
          
          <div className="mb-6 flex flex-row items-center">
            {!sidebarOpen && (
              <button 
                onClick={() => setSidebarOpen(true)} 
                className="mr-4 text-gray-500 hover:text-gray-700"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Defect Analyzer - Ollama</h1>
          </div>

          {/* Informative Note Box */}
          {noteVisible && (
            <div 
              className="bg-amber-50 border border-amber-200 text-amber-700 rounded-lg mb-6 p-4 relative"
            >
              <button 
                onClick={() => setNoteVisible(false)}
                className="absolute top-2 right-2 text-amber-600 hover:text-amber-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex flex-col sm:flex-row items-start pr-8">
                <AlertTriangle className="h-6 w-6 mb-2 sm:mb-0 sm:mr-3 flex-shrink-0 text-amber-600" />
                <div>
                  <h3 className="font-semibold mb-2 text-amber-800">Ollama Local Setup Required</h3>
                  <p className="text-sm">
                    To use this model, you need to run Ollama locally on your machine. 
                    Please ensure you have:
                  </p>
                    <ul className="list-disc list-inside mt-2 text-sm">
                      <li>Ollama installed</li>
                      <li>Gemma3 model pulled (run: <code>ollama pull gemma3</code>)</li>
                      <li>Ollama server running</li>
                    </ul>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Image upload section */}
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-medium text-gray-800 mb-4">Upload Image</h2>
              <label className="cursor-pointer border-dashed border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
                {!preview ? (
                  <>
                    <UploadCloud className="h-8 sm:h-12 w-8 sm:w-12 text-gray-400 mb-3" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700">Drag and drop or click to upload</span>
                    <span className="text-xs text-gray-500 mt-1">Supported formats: JPG, PNG, WEBP</span>
                  </>
                ) : (
                  <div className="relative w-full">
                    <img src={preview} alt="Preview" className="rounded-md w-full object-contain max-h-48 sm:max-h-64" />
                  </div>
                )}
                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
              </label>

              <button
                className="mt-4 sm:mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center transition-colors"
                onClick={classifyImage}
                disabled={!image || loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                    Analyzing...
                  </>
                ) : (
                  "Check for Defects"
                )}
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-medium text-gray-800 mb-4">Analysis Results</h2>
              {result ? (
                  <div className="mt-2">
                  <div className={`p-4 rounded-md ${result.toLowerCase().includes("defective") && !result.toLowerCase().includes("not defective") ||
                      result.toLowerCase().includes("does not align")
                      ? "bg-red-50 border border-red-200"
                      : "bg-green-50 border border-green-200"
                    }`}>
                    <div className="flex items-start">
                      <div>
                        <div className='mt-2 text-sm'>
                          <p>{renderResultWithFormatting(result)}</p>
                        
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 sm:h-64 text-gray-500">
                  <FileImage className="h-8 sm:h-12 w-8 sm:w-12 text-gray-300 mb-3" />
                  <p className="text-center text-xs sm:text-base">
                    {loading 
                      ? "Analyzing image..." 
                      : "Upload an image and click 'Check for Defects' to see results here"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OllamaDefectChecker;