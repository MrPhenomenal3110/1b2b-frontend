"use client";

import { ImageIcon, InfoIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const BASE_URL_1 = "https://oneb2b-backend.onrender.com/analyse";
const BASE_URL_2 = "https://1b2b.deno.dev";

const UploadPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
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
      Google: ["Display Network Ads", "Discovery Ads"],
      Instagram: ["Feed Posts", "Stories"],
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

  const handleImageUpload = async (file) => {
    if (file) {
      const acceptedTypes = [
        "image/*",
        "application/x-photoshop",
        "image/vnd.adobe.photoshop", 
        "application/photoshop",
        "application/psd",
        "image/psd"
      ];

      // Check if it's an image file
      if (file.type.startsWith('image/')) {
        // Valid image file
      }
      // Check if it's a PSD file by extension since MIME type can be inconsistent
      else if (file.name.toLowerCase().endsWith('.psd')) {
        // Valid PSD file
      }
      else {
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
        const response = await fetch(BASE_URL_1, {
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
      const finalResponse = await fetch(BASE_URL_2, {
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

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  };

  const handleUpdateSettings = () => {
    setIsDone(false);
    setFinalResults(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      {!selectedImage ? (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">AdVantage</h1>
            <p className="text-gray-600">
              Upload your advertisement to check compliance and get detailed
              recommendations
            </p>
          </div>

          <label
            className={`relative block w-full aspect-video border-4 border-dashed rounded-2xl p-8 transition-all duration-300 ease-in-out cursor-pointer
              ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
              }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              className="hidden"
              accept="image/*, application/psd, application/photoshop"
              onChange={handleFileSelect}
            />
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <ImageIcon className="w-16 h-16 text-gray-400" />
              <div className="text-center">
                <p className="text-lg font-medium text-gray-500">
                  drop your image or psd file here
                </p>
                <p className="text-sm text-gray-500 mt-2">or click to browse</p>
              </div>
            </div>
          </label>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            <div className="w-64 shrink-0">
              <div className="sticky top-8 space-y-4">
                <div className="relative w-full rounded-xl overflow-hidden shadow-lg border border-gray-200">
                  <Image
                    src={selectedImage}
                    alt="Uploaded image preview"
                    width={256}
                    height={256}
                    className="object-contain w-full"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/240";
                    }}
                  />
                </div>
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setSelectedFile(null);
                    setAnalysisResults(null);
                    setFinalResults(null);
                    setIsDone(false);
                  }}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Upload Different Image
                </button>

                {analysisResults && !isAnalyzing && (
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-3">
                      Current Settings
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-black font-semibold">
                          Platform
                        </span>
                        {" : "}
                        {formData.platform.name}
                      </p>
                      <p>
                        <span className="text-black font-semibold">
                          Placement
                        </span>
                        {" : "}
                        {formData.platform.placement}
                      </p>
                      <p>
                        <span className="text-black font-semibold">
                          Devices
                        </span>
                        {" : "}
                        {formData.platform.device_targeting.join(", ")}
                      </p>
                      <p>
                        <span className="text-black font-semibold">
                          Objective
                        </span>
                        {" : "}
                        {formData.platform.objective}
                      </p>
                      <button
                        onClick={handleUpdateSettings}
                        disabled={isAnalyzing}
                        className="w-full mt-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
                      >
                        Update Analysis
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 bg-white rounded-2xl shadow-xl p-8">
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                  <p className="mt-4 text-gray-600">
                    {analysisResults
                      ? "Processing configuration..."
                      : "Analyzing image..."}
                  </p>
                </div>
              ) : analysisResults && !isDone ? (
                <form onSubmit={handleFormSubmit} className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Configure Campaign Settings
                  </h2>

                  <div className="space-y-4">
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
              ) : isDone && finalResults ? (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-gray-800 border-b pb-4">
                    Campaign Analysis Results
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-100 border border-gray-300 p-6 rounded-xl">
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                        Image Analysis
                      </h3>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold underline text-xl text-gray-700 mb-2">
                            Image Specifications
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-600">
                                Dimensions
                              </p>
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
                                {analysisResults?.analysis?.image_specs
                                  ?.format || "-"}
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
                          <h4 className="font-semibold underline text-xl text-gray-700 mb-2">
                            Color Scheme
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-600">
                                Dominant Color
                              </p>
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-6 h-6 rounded-md border border-black"
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
                                  className="w-6 h-6 rounded-md border border-black"
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
                              <div className="flex flex-col mt-1">
                                {analysisResults?.analysis?.content?.color_scheme?.accent?.map(
                                  (color, index) => (
                                    <div
                                      key={index}
                                      className="flex flex-row mb-3"
                                    >
                                      <div
                                        className="w-6 h-6 rounded-md mr-2 border border-black"
                                        style={{ backgroundColor: color }}
                                        title={color}
                                      />
                                      <span>{color}</span>
                                    </div>
                                  )
                                ) || "-"}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold underline text-xl text-gray-700 mb-2">
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
                              <p className="text-sm text-gray-600">
                                White Space
                              </p>
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
                          <h4 className="font-semibold underline text-xl text-gray-700 mb-2">
                            Visual Elements Detected
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
                      <div className="bg-gray-100 border border-gray-300 p-6 rounded-xl relative">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          Compliance Status
                        </h3>
                        <div
                          className={`text-lg font-medium p-3 rounded-lg relative ${
                            finalResults.compliance_status === "COMPLIANT"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {finalResults.compliance_status.replace("_", " ")}
                        </div>
                      </div>

                      <div className="bg-gray-100 p-6 rounded-xl border border-gray-300">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          Severity
                          <div className="relative group">
                            <InfoIcon className="h-4 w-4 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-64 p-2 bg-gray-900 text-white text-sm rounded shadow-lg">
                              Performance Impact indicates how well your ad is
                              expected to perform based on platform requirements
                              and best practices. HIGH impact means significant
                              improvements are needed.
                            </div>
                          </div>
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
                    <div className="bg-gray-100 border border-gray-300 p-6 rounded-xl">
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

                  {finalResults.general_recommendations && (
                    <div className="bg-gray-100 border border-gray-300 p-6 rounded-xl">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Recommendations
                      </h3>
                      <ul className="space-y-3">
                        {finalResults.general_recommendations.map(
                          (recommendation, index) => (
                            <li
                              key={index}
                              className="flex gap-3 text-gray-700"
                            >
                              <span className="text-blue-500">•</span>
                              {recommendation}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {finalResults.detailed_analysis && (
                    <div className="bg-gray-100 border border-gray-300 p-6 rounded-xl mt-8">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Detailed Analysis
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {finalResults.detailed_analysis.strengths && (
                          <div>
                            <h4 className="font-medium text-green-700 mb-2">
                              Strengths
                            </h4>
                            <ul className="space-y-2">
                              {finalResults.detailed_analysis.strengths.map(
                                (strength, index) => (
                                  <li
                                    key={index}
                                    className="flex gap-2 text-gray-700"
                                  >
                                    <span className="text-green-500">✓</span>
                                    {strength}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}

                        {finalResults.detailed_analysis.weaknesses && (
                          <div>
                            <h4 className="font-medium text-red-700 mb-2">
                              Weaknesses
                            </h4>
                            <ul className="space-y-2">
                              {finalResults.detailed_analysis.weaknesses.map(
                                (weakness, index) => (
                                  <li
                                    key={index}
                                    className="flex gap-2 text-gray-700"
                                  >
                                    <span className="text-red-500">⚠</span>
                                    {weakness}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}

                        {finalResults.detailed_analysis.opportunities && (
                          <div>
                            <h4 className="font-medium text-blue-700 mb-2">
                              Opportunities
                            </h4>
                            <ul className="space-y-2">
                              {finalResults.detailed_analysis.opportunities.map(
                                (opportunity, index) => (
                                  <li
                                    key={index}
                                    className="flex gap-2 text-gray-700"
                                  >
                                    <span className="text-blue-500">↗</span>
                                    {opportunity}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}

                        {finalResults.detailed_analysis.risks && (
                          <div>
                            <h4 className="font-medium text-yellow-700 mb-2">
                              Risks
                            </h4>
                            <ul className="space-y-2">
                              {finalResults.detailed_analysis.risks.map(
                                (risk, index) => (
                                  <li
                                    key={index}
                                    className="flex gap-2 text-gray-700"
                                  >
                                    <span className="text-yellow-500">!</span>
                                    {risk}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {finalResults.approval_prediction && (
                    <div className="bg-gray-100 border border-gray-300 p-6 rounded-xl mt-8">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        Approval Prediction
                        <div className="relative group">
                          <InfoIcon className="h-4 w-4 text-gray-400 cursor-help" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-64 p-2 bg-gray-900 text-white text-sm rounded shadow-lg">
                            Our prediction of whether your ad will be approved
                            based on platform guidelines and requirements.
                          </div>
                        </div>
                      </h3>

                      <div
                        className={`text-lg font-medium p-3 rounded-lg mb-4 ${
                          finalResults.approval_prediction.likely_to_be_approved
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {finalResults.approval_prediction.likely_to_be_approved
                          ? "Likely to be approved"
                          : "May need revisions before approval"}
                      </div>

                      {finalResults.approval_prediction.potential_blockers && (
                        <div className="mb-4">
                          <h4 className="font-medium text-red-700 mb-2">
                            Potential Blockers
                          </h4>
                          <ul className="space-y-2">
                            {finalResults.approval_prediction.potential_blockers.map(
                              (blocker, index) => (
                                <li
                                  key={index}
                                  className="flex gap-2 text-gray-700"
                                >
                                  <span className="text-red-500">×</span>
                                  {blocker}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                      {finalResults.approval_prediction.suggested_fixes && (
                        <div>
                          <h4 className="font-medium text-blue-700 mb-2">
                            Suggested Fixes
                          </h4>
                          <ul className="space-y-2">
                            {finalResults.approval_prediction.suggested_fixes.map(
                              (fix, index) => (
                                <li
                                  key={index}
                                  className="flex gap-2 text-gray-700"
                                >
                                  <span className="text-blue-500">→</span>
                                  {fix}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
