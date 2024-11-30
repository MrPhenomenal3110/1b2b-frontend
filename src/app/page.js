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
    names: ["Meta", "Google", "Instagram", "LinkedIn", "Twitter"],
    placements: {
      Meta: ["Image Feed Ads", "Stories Ads", "Carousel Ads"],
      Google: ["Display Network Ads", "Search Ads", "Discovery Ads"],
      Instagram: ["Feed Posts", "Stories and Reels"],
      LinkedIn: ["Sponsored Content", "Message Ads"],
      Twitter: ["Image Ads"],
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
      // Check if file is an accepted type
      const acceptedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/svg+xml",
        "image/bmp",
        "image/tiff",
        "application/x-photoshop",
        "image/vnd.adobe.photoshop",
        "application/photoshop",
        "application/psd",
      ];

      if (!acceptedTypes.includes(file.type)) {
        alert("Please upload an image file or PSD file");
        return;
      }

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
          platform: {
            ...formData.platform,
            name: formData.platform.name.toUpperCase(),
          },
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
              accept="image/*, application/psd, application/photoshop"
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
                  {analysisResults
                    ? "Processing configuration..."
                    : "Analyzing image..."}
                </p>
              </div>
            )}

            {analysisResults && !isDone && (
              <form
                onSubmit={handleFormSubmit}
                className="bg-white p-6 rounded-lg border border-gray-200"
              >
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
                        {platformOptions.placements[
                          formData.platform.name
                        ]?.map((placement) => (
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
                        <label
                          key={device}
                          className="inline-flex items-center"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox"
                            checked={formData.platform.device_targeting.includes(
                              device
                            )}
                            onChange={() => {
                              const newDevices =
                                formData.platform.device_targeting.includes(
                                  device
                                )
                                  ? formData.platform.device_targeting.filter(
                                      (d) => d !== device
                                    )
                                  : [
                                      ...formData.platform.device_targeting,
                                      device,
                                    ];
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
              <div className="bg-white p-8 rounded-xl shadow-2xl space-y-8">
                <h2 className="text-3xl font-bold text-gray-800 border-b pb-4">
                  Campaign Analysis Results
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Image Analysis
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Image Specifications
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Dimensions</p>
                            <p className="font-medium">
                              {analysisResults?.analysis?.image_specs
                                ?.dimensions?.width || "-"}{" "}
                              x{" "}
                              {analysisResults?.analysis?.image_specs
                                ?.dimensions?.height || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Format</p>
                            <p className="font-medium">
                              {analysisResults?.analysis?.image_specs?.format ||
                                "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Aspect Ratio
                            </p>
                            <p className="font-medium">
                              {analysisResults?.analysis?.image_specs?.aspect_ratio?.toFixed(
                                2
                              ) || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Size Category
                            </p>
                            <p className="font-medium capitalize">
                              {analysisResults?.analysis?.image_specs
                                ?.size_category || "-"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Color Scheme
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">
                              Dominant Color
                            </p>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-6 h-6 rounded-full border"
                                style={{
                                  backgroundColor:
                                    analysisResults?.analysis?.content
                                      ?.color_scheme?.dominant || "#fff",
                                }}
                              />
                              <p className="font-medium">
                                {analysisResults?.analysis?.content
                                  ?.color_scheme?.dominant || "-"}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Background Color
                            </p>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-6 h-6 rounded-full border"
                                style={{
                                  backgroundColor:
                                    analysisResults?.analysis?.content
                                      ?.color_scheme?.background || "#fff",
                                }}
                              />
                              <p className="font-medium">
                                {analysisResults?.analysis?.content
                                  ?.color_scheme?.background || "-"}
                              </p>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <p className="text-sm text-gray-600">
                              Accent Colors
                            </p>
                            <div className="flex gap-2 mt-1">
                              {analysisResults?.analysis?.content?.color_scheme?.accent?.map(
                                (color, index) => (
                                  <div
                                    key={index}
                                    className="w-6 h-6 rounded-full border"
                                    style={{ backgroundColor: color }}
                                    title={color}
                                  />
                                )
                              ) || "-"}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Composition Metrics
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">
                              Text Coverage
                            </p>
                            <p className="font-medium">
                              {(
                                analysisResults?.analysis?.content
                                  ?.composition_metrics?.text_coverage * 100
                              ).toFixed(1)}
                              %
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Visual Coverage
                            </p>
                            <p className="font-medium">
                              {(
                                analysisResults?.analysis?.content
                                  ?.composition_metrics?.visual_coverage * 100
                              ).toFixed(1)}
                              %
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">White Space</p>
                            <p className="font-medium">
                              {(
                                analysisResults?.analysis?.content
                                  ?.composition_metrics?.white_space * 100
                              ).toFixed(1)}
                              %
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Balance Score
                            </p>
                            <p className="font-medium">
                              {(
                                analysisResults?.analysis?.content
                                  ?.composition_metrics?.balance_score * 10
                              ).toFixed(1)}
                              /10
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Visual Elements
                        </h4>
                        <ul className="space-y-2">
                          {analysisResults?.analysis?.content?.visual_elements?.background_elements?.map(
                            (element, i) => (
                              <li
                                key={i}
                                className="flex justify-between items-center"
                              >
                                <span>{element.name}</span>
                                <span className="text-blue-600 font-medium">
                                  {(element.confidence || 0).toFixed(2)}%
                                </span>
                              </li>
                            )
                          ) || (
                            <li className="text-gray-500">
                              No visual elements detected
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Compliance Status
                      </h3>
                      <div
                        className={`text-lg font-medium p-3 rounded-lg ${
                          finalResults.compliance_status === "COMPLIANT"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {finalResults.compliance_status.replace("_", " ")}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Performance Impact
                      </h3>
                      <div
                        className={`text-lg font-medium p-3 rounded-lg ${
                          finalResults.estimated_performance_impact === "HIGH"
                            ? "bg-red-100 text-red-800"
                            : finalResults.estimated_performance_impact ===
                              "MEDIUM"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {finalResults.estimated_performance_impact}
                      </div>
                    </div>
                  </div>
                </div>

                {finalResults.platform_specific_issues.length > 0 && (
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Platform Issues
                    </h3>
                    <div className="grid gap-4">
                      {finalResults.platform_specific_issues.map(
                        (issue, index) => (
                          <div
                            key={index}
                            className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded-r-lg"
                          >
                            <h4 className="font-medium text-gray-800">
                              {issue.element}
                            </h4>
                            <div className="mt-2 space-y-1 text-sm">
                              <p>
                                <span className="font-medium">Current:</span>{" "}
                                {issue.current_value}
                              </p>
                              <p>
                                <span className="font-medium">Required:</span>{" "}
                                {issue.requirement}
                              </p>
                              <p
                                className={`font-medium ${
                                  issue.severity === "HIGH"
                                    ? "text-red-600"
                                    : issue.severity === "MEDIUM"
                                    ? "text-yellow-600"
                                    : "text-blue-600"
                                }`}
                              >
                                Severity: {issue.severity}
                              </p>
                              <p className="text-gray-600 mt-2">
                                {issue.recommendation}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Recommendations
                  </h3>
                  <ul className="space-y-3">
                    {finalResults.general_recommendations.map(
                      (recommendation, index) => (
                        <li key={index} className="flex gap-3 text-gray-700">
                          <span className="text-blue-500">•</span>
                          {recommendation}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
