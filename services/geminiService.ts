
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function performOCR(imageContent: string): Promise<string> {
  const base64Data = imageContent.split(',')[1] || imageContent;

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/png',
            data: base64Data,
          },
        },
        {
          text: "Extract all text from this image and format it into a professional Word-style document layout in Markdown. Only return the text content.",
        },
      ],
    },
    config: {
      temperature: 0.1,
    }
  });

  return response.text || "No text could be extracted.";
}

export async function analyzeDocument(imageContent: string): Promise<any> {
  const base64Data = imageContent.split(',')[1] || imageContent;

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/png',
            data: base64Data,
          },
        },
        {
          text: "Analyze this document image. Identify if it is an M-PESA receipt, an ID card, a business invoice, or general text. Provide a brief summary and extract key entities like 'Transaction ID', 'Amount', 'Date', or 'Name' if applicable.",
        },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING, description: "Type of document detected" },
          summary: { type: Type.STRING, description: "A one-sentence summary of the document content" },
          entities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                value: { type: Type.STRING }
              },
              required: ["label", "value"]
            }
          }
        },
        required: ["category", "summary", "entities"]
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    throw new Error("Failed to parse AI response");
  }
}
