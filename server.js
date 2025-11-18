import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post("/api/generate-map-code", async (req, res) => {
  const { prompt } = req.body;
  console.log("🧠 Received prompt:", prompt);

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `${prompt}
Return ONLY valid JSON. Use *exact state names* that match us-states.json.
Example:

{
  "highlightStates": ["Illinois"],
  "labels": [
    {"name": "Missouri"},
    {"name": "Iowa"},
    {"name": "Kentucky"}
  ],
  "markers": [
    {"name": "New Canton", "lat": 39.8378, "lng": -90.8668}
  ]
}

⚠️ DO NOT return polygons, ASCII art, explanations, or text.`
                }
              ]
            }
          ]
        }),
      }
    );

    const data = await response.json();
    console.log("📥 Gemini raw response:", JSON.stringify(data, null, 2));

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    let cleaned = text.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/```json|```/g, "").trim();
    }

    const json = JSON.parse(cleaned);
    console.log("📦 Cleaned instructions ready for frontend");
    res.json(json);
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
