// test-env.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// ✅ Initialize Gemini client with your AI Studio API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Use a valid Gemini model
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const run = async () => {
  try {
    // Simple test prompt
    const result = await model.generateContent("Say hello in one word");

    // ✅ Correct extraction method in @google/generative-ai
    console.log("✅ Gemini replied:", result.response.text());

  } catch (err) {
    console.error("❌ Gemini test failed:", err);
  }
};

run();




