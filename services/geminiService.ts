import { GoogleGenAI, Type } from "@google/genai";
import { FoodItem } from '../types';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeFoodText = async (text: string): Promise<FoodItem[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following food search query and return a list of matching food items with estimated nutritional info. 
      Provide standard serving sizes.
      Input: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "Common name of the food" },
              calories: { type: Type.INTEGER, description: "Calories in kcal" },
              protein: { type: Type.NUMBER, description: "Protein in grams" },
              carbs: { type: Type.NUMBER, description: "Carbohydrates in grams" },
              fat: { type: Type.NUMBER, description: "Fat in grams" },
              amount: { type: Type.STRING, description: "Estimated amount (e.g., 1 cup, 1 apple)" },
              grams: { type: Type.INTEGER, description: "The weight in grams for this serving size" },
            },
            required: ["name", "calories", "protein", "carbs", "fat", "amount", "grams"],
          },
        },
      },
    });

    const result = response.text;
    if (!result) return [];
    
    const parsed = JSON.parse(result);
    
    // Add IDs and icons
    return parsed.map((item: any, index: number) => ({
      ...item,
      id: `ai-${Date.now()}-${index}`,
      servingSizeGrams: item.grams || 100, // Fallback to 100g if missing
      icon: '🍽️', 
    }));

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return [];
  }
};