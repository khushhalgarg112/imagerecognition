import { GoogleGenerativeAI } from "@google/generative-ai";
import { useRef, useState } from "react";

const API_KEY = "AIzaSyAxvALcPFqQW5iaYtM7X5NhzCg6WBRiTZ8"; // Replace 'YOUR_API_KEY' with your actual API key

const Gemini = ({ file }) => {
  const prompt = `Assume you are a good image recognizer which can recognize image pixel by pixel in detail, Give answer in object form like this: { category: "string", nature: "string (this contains whether the object is good or bad for the environment)", carbonFootprint: "string (carbon footprint per year with proper unit)", suggestion: "string (any suggestion)", } Take time and try to recognize the object precisely every time I provide the input. If the type of object is the same type, the carbon footprint value should be the same. If the AI can recognize information about the object's length and width from the data provided, it should calculate the carbon footprint accordingly. Additionally, if a living being is detected in the image, the show carbon footprint invalid and return the prompt "Enter data again"`;

  const [generatedText, setGeneratedText] = useState("");
  const genAI = new GoogleGenerativeAI(API_KEY);

  const fileToGenerativePart = async (file) => {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  };

  const handleSubmit = async () => {
    const imagePart = await fileToGenerativePart(file);
    generateContent([imagePart]);
  };

  const generateContent = async (imageParts) => {
    // For text-and-images input (multimodal), use the gemini-pro-vision model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = await response.text();
    setGeneratedText(text);
  };

  return (
    <div>
      <h1>Carbon Footprint Tracker</h1>
      <button onClick={handleSubmit}>Generate Content</button>
      {generatedText && (
        <div>
          <h2>Generated Text:</h2>
          <p>{generatedText}</p>
        </div>
      )}
    </div>
  );
};

export default Gemini;