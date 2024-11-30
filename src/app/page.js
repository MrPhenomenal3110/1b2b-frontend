"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [finalResults, setFinalResults] = useState(null);
  const [formData, setFormData] = useState({
    platform: {
      name: "",
      placement: "",
      device_targeting: [],
      objective: "",
    },
    metadata: {
      campaign_name: "",
      target_audience: {
        age_range: "",
        interests: [],
        location: "",
      },
      tracking: {
        utm_source: "",
        utm_medium: "", 
        utm_campaign: "",
      },
    },
  });

  const platformOptions = {
    names: [
      "Facebook",
      "Google Ads", 
      "Instagram",
      "LinkedIn",
      "TikTok",
      "Twitter",
    ],
    placements: {
      Facebook: ["Feed", "Stories", "Carousel", "Marketplace"],
      "Google Ads": ["Display Network", "Search", "Video", "Discovery"],
      Instagram: ["Feed", "Stories", "Reels", "Explore"],
      LinkedIn: ["Feed", "Message Ads", "Dynamic Ads", "Text Ads"],
      TikTok: ["In-Feed", "TopView", "Brand Takeover", "Spark Ads"],
      Twitter: ["Timeline", "Explore", "Profile", "Tweet detail"],
    },
    devices: ["mobile", "desktop", "tablet"],
    objectives: [
      "Awareness",
      "Consideration", 
      "Conversions",
      "Lead Generation",
      "Sales",
      "Traffic",
    ],
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setSelectedFile(file);
      setIsAnalyzing(true);
      setIsDone(false);
      setAnalysisResults(null);
      setFinalResults(null);

      const formData = new FormData();
      formData.append("file1", file);

      try {
        const response = await fetch("https://oneb2b.koyeb.app/analyse", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        setAnalysisResults(data[0].results[0]);
        setIsAnalyzing(false);
      } catch (error) {
        console.error("Error:", error);
        setIsAnalyzing(false);
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);

    try {
      const finalResponse = await fetch("https://1b2b.deno.dev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: analysisResults,
          platform: formData.platform,
          metadata: formData.metadata,
        }),
      });

      const finalData = await finalResponse.json();
      setFinalResults(finalData);
      setIsDone(true);
      setIsAnalyzing(false);
    } catch (error) {
      console.error("Error:", error);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-4xl space-y-8">
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
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div className="w-full animate-pulse bg-blue-500 rounded"></div>
                  </div>
                </div>
                <p className="text-xl font-semibold text-gray-800 animate-pulse">
                  {analysisResults ? "Processing configuration..." : "Analyzing image..."}
                </p>
              </div>
            )}

            {analysisResults && !isDone && (
              <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Configure Your Advertisement
                </h2>

                {/* Platform Selection */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Platform
                    </label>
                    <select
                      required
                      className="w-full p-2 border rounded-md"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          platform: {
                            ...prev.platform,
                            name: e.target.value,
                          },
                        }))
                      }
                      value={formData.platform.name}
                    >
                      <option value="">Select platform</option>
                      {platformOptions.names.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formData.platform.name && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Placement
                      </label>
                      <select
                        required
                        className="w-full p-2 border rounded-md"
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            platform: {
                              ...prev.platform,
                              placement: e.target.value,
                            },
                          }))
                        }
                        value={formData.platform.placement}
                      >
                        <option value="">Select placement</option>
                        {platformOptions.placements[formData.platform.name]?.map((placement) => (
                          <option key={placement} value={placement}>
                            {placement}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Device Targeting
                    </label>
                    <div className="flex gap-4">
                      {platformOptions.devices.map((device) => (
                        <label key={device} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox"
                            checked={formData.platform.device_targeting.includes(device)}
                            onChange={() => {
                              const newDevices = formData.platform.device_targeting.includes(device)
                                ? formData.platform.device_targeting.filter((d) => d !== device)
                                : [...formData.platform.device_targeting, device];
                              setFormData((prev) => ({
                                ...prev,
                                platform: {
                                  ...prev.platform,
                                  device_targeting: newDevices,
                                },
                              }));
                            }}
                          />
                          <span className="ml-2 capitalize">{device}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Campaign Objective
                    </label>
                    <select
                      required
                      className="w-full p-2 border rounded-md"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          platform: {
                            ...prev.platform,
                            objective: e.target.value,
                          },
                        }))
                      }
                      value={formData.platform.objective}
                    >
                      <option value="">Select objective</option>
                      {platformOptions.objectives.map((objective) => (
                        <option key={objective} value={objective}>
                          {objective}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Analyze Campaign
                </button>
              </form>
            )}

            {isDone && finalResults && (
              <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Campaign Analysis</h2>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Compliance Status</h3>
                  <div className={`text-lg font-medium ${finalResults.compliance_status === 'COMPLIANT' ? 'text-green-600' : 'text-red-600'}`}>
                    {finalResults.compliance_status.replace('_', ' ')}
                  </div>
                </div>

                {finalResults.platform_specific_issues.map((issue, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">{issue.element}</h3>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <span className="font-medium">Current Value:</span> {issue.current_value}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Requirement:</span> {issue.requirement}
                      </p>
                      <p className={`font-medium ${
                        issue.severity === 'HIGH' ? 'text-red-600' : 
                        issue.severity === 'MEDIUM' ? 'text-yellow-600' : 'text-blue-600'
                      }`}>
                        Severity: {issue.severity}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Recommendation:</span> {issue.recommendation}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">General Recommendations</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {finalResults.general_recommendations.map((recommendation, index) => (
                      <li key={index} className="text-gray-700">{recommendation}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Performance Impact</h3>
                  <div className={`text-lg font-medium ${
                    finalResults.estimated_performance_impact === 'HIGH' ? 'text-red-600' :
                    finalResults.estimated_performance_impact === 'MEDIUM' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {finalResults.estimated_performance_impact}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
