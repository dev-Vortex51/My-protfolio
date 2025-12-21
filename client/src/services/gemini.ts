import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const refineText = async (
  text: string,
  context: string
): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a professional software engineering career coach. Please refine and improve the following ${context} to be more professional, impactful, and concise. Keep the core meaning but use stronger action verbs and better phrasing: "${text}"`,
    });
    return response.text?.trim() || text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return text;
  }
};

export const suggestTags = async (description: string): Promise<string[]> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Given this software project description, suggest 4-5 relevant technology tags (comma separated): "${description}"`,
    });
    const tags = response.text?.split(",").map((t) => t.trim()) || [];
    return tags.slice(0, 5);
  } catch (error) {
    return [];
  }
};
