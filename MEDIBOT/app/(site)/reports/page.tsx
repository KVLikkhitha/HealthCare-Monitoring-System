"use client" 


import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Reports = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [userPrompt, setUserPrompt] = useState("");
  const [reportsInsights, setReportsInsights] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

const MODEL_NAME = "gemini-pro";
const API_KEY = "#";

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadedFile(file || null);
  };

  const handlePdfUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPdfUrl(e.target.value);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPrompt(e.target.value);
  };

// Advanced response formatter
const formatResponse = (response: string) => {
  // Remove asterisks and clean up formatting
  let formattedResponse = response.replace(/[\*]{1,2}/g, '');
  
  // Split by numbered sections and format
  const sectionPattern = /(\d+\.\s*[^0-9]+)(?=\d+\.|$)/g;
  const sections: string[] = [];
  
  // Explicitly type the match variable
  let match: RegExpExecArray | null = null;
  
  while ((match = sectionPattern.exec(formattedResponse)) !== null) {
    // Safely access the second capture group
    if (match[1]) {
      sections.push(match[1].trim());
    }
  }
  
  // If no sections found, return original response
  return sections.length > 0 
    ? sections.map((section) => `${section}\n`).join('\n').trim()
    : formattedResponse;
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadedFile && !pdfUrl) {
      setError("Please upload a PDF file or provide a PDF URL.");
      return;
    }

    setError("");
    setIsLoading(true);
    setReportsInsights("MediBot is thinking...");

    try {
      // PDF Extraction
      let extractedText = "";
      const apiUrl = "https://face-api-0i86.onrender.com/extract_pdf";

      const fetchOptions: RequestInit = uploadedFile 
        ? {
            method: "POST",
            body: (() => {
              const formData = new FormData();
              formData.append("pdf_file", uploadedFile);
              return formData;
            })()
          }
        : {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pdf_url: pdfUrl })
          };

      const response = await fetch(apiUrl, fetchOptions);

      if (!response.ok) {
        throw new Error("Failed to process the PDF. Please try again.");
      }

      const data = await response.json();
      extractedText = data.text || "No text extracted.";

      // AI Analysis using Google Gemini
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const generationConfig = {
        temperature: 0.1,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };

      const parts = [
        { text: `Extracted PDF Text:\n${extractedText}\n\n` },
        { text: `User Request: ${userPrompt}\n\n` },
        { text: "Provide a detailed medical analysis based on the extracted text and user's specific request." },
      ];

      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
      });

      const aiResponse = result.response;
      const formattedInsights = formatResponse(aiResponse.text());
      setReportsInsights(formattedInsights);
    //   setReportsInsights(aiResponse.text());
      setIsLoading(false);
    } catch (error) {
      setError("Failed to process the request. Please try again.");
      console.error(error);
      setIsLoading(false);
    }
  };

  // Rest of the component remains the same as in the previous version
  return (
<div className="pt-20 pb-15 md:pt-40 md:pb-30 mx-10 md:mx-20">
      <form
        className="bg-[#1c2136] border-slate-700 border rounded-md w-full p-5"
        onSubmit={handleSubmit}
      >
        <h2 className="text-white text-xl font-bold mb-4">
          Upload Medical Reports or Enter a PDF URL
        </h2>

        {/* File Upload */}
        <div className="mb-4">
          <label htmlFor="file-upload" className="text-white block mb-2">
            Upload Medical Report (Optional)
          </label>
          <input
            type="file"
            id="file-upload"
            accept=".pdf"
            className="text-white"
            onChange={handleFileUpload}
          />
        </div>

        {/* PDF URL Input */}
        <div className="mb-4">
          <label htmlFor="pdf-url" className="text-white block mb-2">
            Or Provide PDF URL (Optional)
          </label>
          <input
            type="text"
            id="pdf-url"
            placeholder="Enter PDF URL"
            value={pdfUrl}
            onChange={handlePdfUrlChange}
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
            placeholder="E.g., 'Summarize key medical findings' or 'Identify potential health risks'"
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
    </div>  );
};

export default Reports;

