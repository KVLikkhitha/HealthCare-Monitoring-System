
"use client";

import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Reports = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [userPrompt, setUserPrompt] = useState("");
  const [reportsInsights, setReportsInsights] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const MODEL_NAME = "gemini-pro";
  const API_KEY = "#";

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadedImage(file || null);
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPrompt(e.target.value);
  };

  const formatResponse = (response: string) => {
    let formattedResponse = response.replace(/[\*]{1,2}/g, "");
    return formattedResponse.trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadedImage && !imageUrl) {
      setError("Please upload an image or provide an image URL.");
      return;
    }

    setError("");
    setIsLoading(true);
    setReportsInsights("MediBot is thinking...");

    try {
      // Placeholder for image extraction logic (if needed).
      const imageReference = uploadedImage
        ? "Uploaded medical image"
        : `Image at URL: ${imageUrl}`;

      // AI Analysis using Google Gemini
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const parts = [
        { text: `Analyze the medical relevance of the following image:\n${imageReference}\n` },
        { text: `User Prompt: ${userPrompt}\n` },
        { text: "If the image relates to medical issues, provide detailed suggestions or guidance. If not, indicate 'Not related to medical issues'." },
      ];

      const generationConfig = {
        temperature: 0.1,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };

      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
      });

      const aiResponse = result.response;
      const formattedInsights = formatResponse(aiResponse.text());
      setReportsInsights(formattedInsights);
      setIsLoading(false);
    } catch (error) {
      setError("Failed to process the request. Please try again.");
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-20 pb-15 md:pt-40 md:pb-30 mx-10 md:mx-20">
      <form
        className="bg-[#1c2136] border-slate-700 border rounded-md w-full p-5"
        onSubmit={handleSubmit}
      >
        <h2 className="text-white text-xl font-bold mb-4">
          Upload Medical Image or Enter an Image URL
        </h2>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image-upload" className="text-white block mb-2">
            Upload Medical Image (Optional)
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            className="text-white"
            onChange={handleImageUpload}
          />
        </div>

        {/* Image URL Input */}
        <div className="mb-4">
          <label htmlFor="image-url" className="text-white block mb-2">
            Or Provide Image URL (Optional)
          </label>
          <input
            type="text"
            id="image-url"
            placeholder="Enter Image URL"
            value={imageUrl}
            onChange={handleImageUrlChange}
            className="w-full p-2 rounded-md bg-slate-800 text-white border border-slate-600"
          />
        </div>

        {/* User Prompt */}
        <div className="mb-4">
          <label htmlFor="user-prompt" className="text-white block mb-2">
            What would you like to analyze?
          </label>
          <input
            type="text"
            id="user-prompt"
            placeholder="E.g., 'Identify the medical condition' or 'Provide treatment suggestions'"
            value={userPrompt}
            onChange={handlePromptChange}
            className="w-full p-2 rounded-md bg-slate-800 text-white border border-slate-600"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Analyzing..." : "Generate Insights"}
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="mt-5 text-center text-white">
          MediBot is thinking... Please wait.
        </div>
      )}

      {/* Report Insights */}
      <div className="mt-5 bg-[#1c2136] border-slate-700 border rounded-md w-full p-5">
        <h2 className="text-white text-xl font-bold mb-4">Insights</h2>
        <div className="text-white">
          {!isLoading && (reportsInsights || "No insights yet.")}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-5 text-center text-red-500 font-bold">
        This is AI-generated content. Please consult a doctor for professional advice.
      </div>
    </div>
  );
};

export default Reports;
