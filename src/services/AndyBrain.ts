import { GoogleGenerativeAI } from "@google/generative-ai";
import { TravelPlan, getRandomImg, getThumbnails } from "../services/aiPlanner"; 
import { AffiliateService } from "./affiliateService";

export class AndyBrain {
  private geminiKey: string;
  private openAIKey: string;
  private deepseekKey: string;

  constructor(geminiKey: string = "", openAIKey: string = "", deepseekKey: string = "") {
    this.geminiKey = geminiKey || import.meta.env.VITE_GEMINI_API_KEY || "";
    this.openAIKey = openAIKey || import.meta.env.VITE_OPENAI_API_KEY || "";
    this.deepseekKey = deepseekKey || import.meta.env.VITE_DEEPSEEK_API_KEY || "";
  }

  private getBasePrompt(query: string) {
    return `
      Eres Andy, un planificador de viajes experto, sofisticado y con "calle". Tu estilo es moderno, directo y enfocado en experiencias auténticas.
      
      El usuario busca: "${query}"

      Genera un itinerario de viaje detallado en formato JSON estricto.
      
      REGLAS CRÍTICAS:
      1. **Vuelos**: SALIENDO SIEMPRE DESDE SANTIAGO DE CHILE (SCL). Necesito "flight_fast" (Directo/Premium) y "flight_cheap" (Low-cost).
      2. **Precios**: SIEMPRE en Pesos Chilenos (CLP). Ejemplo: "$1.250.000 CLP".
      3. **Actividades**: 6 actividades por día (Desayuno, Mañana, Almuerzo, Tarde, Cena, Noche).
      4. **Themes**: Usa ['snow', 'beach', 'desert', 'mountain', 'city', 'jungle', 'ocean', 'food', 'cultural', 'party'].
      5. **IDs**: Asigna IDs únicos a cada actividad.
      
      Estructura JSON:
      {
        "destination_name": "...",
        "summary": "...",
        "flight_fast": { "airline": "...", "route": "SCL -> ...", "price_estimate": "...", ... },
        "flight_cheap": { ... },
        "hotels_suggestion": [{ "name": "...", "price_night": "...", ... }],
        "itinerary": [{ "day": 1, "title": "...", "activities": [{ "id": "...", "time": "...", "name": "...", "cost": "...", "activity_theme": "...", ... }] }]
      }
      SOLO ENTREGA EL JSON, sin markdown.
    `;
  }

  async generateItinerary(query: string): Promise<TravelPlan | null> {
    // Try Gemini First
    if (this.geminiKey) {
      console.log("🧠 Intentando con Gemini...");
      const plan = await this.tryGemini(query);
      if (plan) return plan;
    }

    // Try ChatGPT/OpenAI Second
    if (this.openAIKey) {
      console.log("🤖 Fallback a ChatGPT...");
      const plan = await this.tryOpenAI(query);
      if (plan) return plan;
    }

    // Try DeepSeek Third
    if (this.deepseekKey) {
      console.log("🐳 Fallback a DeepSeek...");
      const plan = await this.tryDeepSeek(query);
      if (plan) return plan;
    }

    return null;
  }

  private async tryGemini(query: string): Promise<TravelPlan | null> {
    try {
      const genAI = new GoogleGenerativeAI(this.geminiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = this.getBasePrompt(query);
      
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      return this.processResponse(text);
    } catch (e) {
      console.error("Gemini Error:", e);
      return null;
    }
  }

  private async tryOpenAI(query: string): Promise<TravelPlan | null> {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.openAIKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: this.getBasePrompt(query) }],
          temperature: 0.7
        })
      });
      const data = await response.json();
      return this.processResponse(data.choices[0].message.content);
    } catch (e) {
      console.error("OpenAI Error:", e);
      return null;
    }
  }

  private async tryDeepSeek(query: string): Promise<TravelPlan | null> {
    try {
      const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.deepseekKey}`
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [{ role: "user", content: this.getBasePrompt(query) }],
          temperature: 0.7
        })
      });
      const data = await response.json();
      return this.processResponse(data.choices[0].message.content);
    } catch (e) {
      console.error("DeepSeek Error:", e);
      return null;
    }
  }

  private processResponse(text: string): TravelPlan | null {
    try {
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      let plan = JSON.parse(cleanJson);

      // Post-Processing images & links
      if (plan.itinerary) {
        plan.itinerary.forEach((day: any) => {
          day.activities?.forEach((act: any) => {
            const theme = (act.activity_theme && ['snow', 'beach', 'desert', 'mountain', 'city', 'jungle', 'ocean', 'food', 'cultural', 'party'].includes(act.activity_theme)) 
              ? act.activity_theme 
              : 'city';
            act.image_url = getRandomImg(theme);
            act.thumb_urls = getThumbnails(theme);
          });
        });
      }

      return AffiliateService.enrichPlanWithLinks(plan, "SCL");
    } catch (e) {
      console.error("JSON Process Error:", e);
      return null;
    }
  }
}
