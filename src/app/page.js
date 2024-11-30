"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const steps = [
    "Analyzing image...",
    "Checking compliance...",
    "Extracting data...",
    "Generating report...",
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setIsAnalyzing(true);

      // Simulate analysis steps
      let step = 0;
      const interval = setInterval(() => {
        if (step < steps.length - 1) {
          step++;
          setAnalysisStep(step);
        } else {
          clearInterval(interval);
          setIsAnalyzing(false);
        }
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">
            Ad Analysis Tool
          </h1>
          <label className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl inline-block">
            Upload Advertisement
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {selectedImage && (
          <div className="mt-8 space-y-6">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg">
              <Image
                src={selectedImage}
                alt="Uploaded advertisement"
                fill
                className="object-contain"
              />
            </div>

            {isAnalyzing && (
              <div className="text-center space-y-6">
                <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500 shadow"
                    style={{
                      width: `${((analysisStep + 1) / steps.length) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xl font-semibold text-gray-800">
                  {steps[analysisStep]}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
