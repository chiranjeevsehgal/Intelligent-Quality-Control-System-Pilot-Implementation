import React, { useState } from "react";
import { UploadCloud, FileImage, Menu } from "lucide-react";
import Sidebar from "../components/SideNavbar";

const GeminiDefectChecker = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  //   To handle the image upload and create object url for it
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };


  //   To make a gemini api call and classify the image
  const classifyImage = async () => {
    if (!image) return;
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("https://qc-backend-production.up.railway.app/api/classify-image", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      setResult(data.classification || "Error");
    } catch (error) {
      console.error("Error classifying image:", error);
      setResult("Error occurred");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} currentPage="/" />

      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? "md:ml-64" : "md:ml-20"}`}>
        <div className="p-6">
          <div className="mb-6">
            <div className="flex flex-row mb-2">
              {!sidebarOpen && (
                <button onClick={() => setSidebarOpen(true)} className="mr-4 text-gray-500 hover:text-gray-700">
                  <Menu className="h-6 w-6" />
                </button>
              )}
              <h1 className="text-2xl font-bold text-gray-800">Defect Analyzer - Gemini</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image upload section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Upload Image</h2>

              <label className="cursor-pointer border-dashed border-2 border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
                {!preview ? (
                  <>
                    <UploadCloud className="h-12 w-12 text-gray-400 mb-3" />
                    <span className="text-sm font-medium text-gray-700">Drag and drop or click to upload</span>
                    <span className="text-xs text-gray-500 mt-1">Supported formats: JPG, PNG, WEBP</span>
                  </>
                ) : (
                  <div className="relative w-full">
                    <img src={preview} alt="Preview" className="rounded-md w-full object-contain max-h-64" />
                    <div className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 rounded-full p-1">
                      <FileImage className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
              </label>

              <button
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center transition-colors"
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

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Analysis Results</h2>

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
                          <p>{result}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <FileImage className="h-12 w-12 text-gray-300 mb-3" />
                  <p className="text-center">
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

export default GeminiDefectChecker;