import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLoveNote = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Write a very short, whimsical, and romantic love note (max 2 sentences) for my girlfriend Kulthom. It should be cute and heartfelt. Do not include quotes, just original sweet words.",
    });
    return response.text || "You are the best thing that ever happened to me.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I love you more than all the stars in the sky combined.";
  }
};

export const generateValentineImage = async (): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{
          text: 'A beautiful romantic valentine card background, soft watercolor style, pastel pinks and reds, hearts, flowers, dreamy atmosphere, high quality, no text, empty space in center'
        }]
      },
      config: {
        imageConfig: {
          aspectRatio: '3:4',
        },
      },
    });

    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    return null;
  }
};