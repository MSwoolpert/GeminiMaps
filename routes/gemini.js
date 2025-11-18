import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/generate-map-code", async (req, res) => {
  const { prompt } = req.body;
  console.log("🧠 Received prompt:", prompt);

  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + process.env.GEMINI_API_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: `
Return ONLY valid JSON in this format:

{
  "highlightStates": ["Illinois"],
  "markers": [
    {"name": "New Canton", "lat": 39.8378, "lng": -90.8668}
  ],
  "labels": [
    {"name": "Missouri", "lat": 38.5739, "lng": -92.6038},
    {"name": "Iowa", "lat": 41.8780, "lng": -93.0977},
    {"name": "Kentucky", "lat": 37.8393, "lng": -84.2700}
  ]
}

NO explanations, NO extra text — only valid JSON.
User request: ${prompt}
` }] }]
      }),
    });

    const data = await response.json();
    console.log("📥 Gemini raw response:", JSON.stringify(data, null, 2));

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    // Clean markdown fences if present
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    res.json(parsed);
  } catch (err) {
    console.error("❌ Gemini error:", err);
    res.status(500).json({ error: "Failed to generate map code" });
  }
});

export default router;
