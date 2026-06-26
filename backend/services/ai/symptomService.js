import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const analyzeSymptomsWithAI = async (symptomData) => {
  const { symptoms, age, gender, duration } = symptomData;

  const prompt = `
You are an expert AI Medical Assistant.

Analyze the following patient symptoms and return ONLY valid JSON.

Patient Details:
- Age: ${age}
- Gender: ${gender}
- Symptoms: ${symptoms}
- Duration: ${duration}

Return JSON in this exact structure:

{
  "conditions": ["Condition 1", "Condition 2", "Condition 3"],
  "severity": "Low",
  "specialist": "Medical Specialist",
  "homeCare": ["Tip 1", "Tip 2", "Tip 3"],
  "emergency": ["Sign 1", "Sign 2"]
}

Do not return markdown.
Do not return explanation text.
Return raw JSON only.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const cleanText = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
