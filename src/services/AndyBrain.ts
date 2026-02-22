import { GoogleGenerativeAI } from "@google/generative-ai";
import { TravelPlan, getRandomImg, getThumbnails } from "../services/aiPlanner"; 
import { AffiliateService } from "./affiliateService";

// NOTE: This is a server-side script or Edge Function logic. 
// In a real Vite app, this should be an API route (e.g., via Vercel Functions or a separate backend).
// For this prototype, we will simulate the API call within the client using the API key directly (NOT FOR PRODUCTION).

// ⚠️ WARNING: EXPOSING API KEY IN CLIENT-SIDE CODE IS UNSAFE FOR PRODUCTION.
// For this demo/MVP, we will use a placeholder or assume the user provides it, 
// or use a proxy. For now, we'll implement the "Brain" logic class.

export class AndyBrain {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async generateItinerary(query: string): Promise<TravelPlan | null> {
    try {
      const prompt = `
        Eres Andy, un planificador de viajes experto, sofisticado y con "calle". Tu estilo es moderno, directo y enfocado en experiencias auténticas, ya sea lujo o aventura.
        
        El usuario busca: "${query}"

        Genera un itinerario de viaje detallado en formato JSON estricto.
        El plan debe ser lógico, geográficamente coherente y realista.
        
        Reglas de Oro:
        1. **Personalidad**: Usa un tono cercano pero experto.
        2. **Themes**: Asigna a cada actividad un 'activity_theme' de esta lista EXACTA (elige la más relevante): ['snow', 'beach', 'desert', 'mountain', 'city', 'jungle', 'ocean', 'food', 'cultural', 'party'].
        3. **Vuelos**: Necesito DOS opciones de vuelos:
           - "flight_fast": El vuelo más directo/veloz disponible (pocas escalas, aerolínea premium).
           - "flight_cheap": El vuelo más económico disponible (posiblemente con escalas, aerolínea low-cost).
        4. **Precios**: Estima costos reales en USD.
        5. **Estructura**: Sigue EXACTAMENTE el esquema JSON solicitado. No añadas markdown, solo JSON.

        Esquema JSON Esperado (TravelPlan):
        {
          "destination_name": "Nombre Ciudad/País",
          "summary": "Resumen persuasivo de 2 lineas del viaje.",
          "traveler_type": "Solo/Pareja/Familia/Amigos",
          "trip_vibe": "Cultural/Aventura/Relax/Lujo/Fiesta",
          "flight_fast": {
            "airline": "Nombre Aerolínea Sugerida",
            "route": "Origen -> Destino",
            "price_estimate": "$XXX USD",
            "duration": "XXh XXm",
            "stops": "Directo",
            "emoji_icon": "✈️",
            "call_to_action": "Reservar Vuelo Directo",
            "affiliate_link": "",
            "tag_color": "#00C2FF"
          },
          "flight_cheap": {
            "airline": "Nombre Aerolínea Sugerida",
            "route": "Origen -> Destino",
            "price_estimate": "$XXX USD",
            "duration": "XXh XXm",
            "stops": "1+ Escalas",
            "emoji_icon": "🛫",
            "call_to_action": "Reservar Opción Ahorro",
            "affiliate_link": "",
            "tag_color": "#FF9F66"
          },
          "hotels_suggestion": [
            {
              "name": "Nombre Hotel 1",
              "location": "Barrio/Zona",
              "price_night": "$XXX USD",
              "reason_to_book": "Por qué es genial",
              "emoji_icon": "🏨",
              "call_to_action": "Reservar",
              "affiliate_link": "",
              "tag_color": "#00C2FF",
              "badges": ["Tag1", "Tag2"]
            },
             {
              "name": "Nombre Hotel 2 (Opción B)",
              "location": "Barrio/Zona",
              "price_night": "$XXX USD",
              "reason_to_book": "Por qué es genial",
              "emoji_icon": "🏡",
              "call_to_action": "Reservar",
              "affiliate_link": "",
              "tag_color": "#FF9F66",
              "badges": ["Tag1", "Tag2"]
            }
          ],
          "local_secrets": [
            {
              "title": "Secreto 1",
              "description": "Detalle del secreto",
              "type": "Foodie/View/Culture",
              "emoji_icon": "🤫",
              "tag_color": "#00C2FF"
            },
            {
               "title": "Secreto 2",
               "description": "Detalle del secreto",
               "type": "Hack",
               "emoji_icon": "💎",
               "tag_color": "#FF9F66"
            }
          ],
          "itinerary": [
            {
              "day": 1,
              "title": "Explorando lo mejor de...",
              "activities": [
                {
                  "time": "Desayuno",
                  "name": "Café o Panadería local icónica",
                  "description": "Comienza con sabor local. Detalla qué pedir.",
                  "cost": "$XX USD",
                  "emoji_icon": "☕",
                  "location_url": "",
                  "is_paid_activity": true,
                  "tips": "Tip de experto sobre el lugar.",
                  "activity_theme": "food"
                },
                {
                  "time": "Mañana",
                  "name": "Atracción Principal / Monumento",
                  "description": "La visita obligada de la mañana.",
                  "cost": "$XX USD / Gratis",
                  "emoji_icon": "🏛️",
                  "location_url": "",
                  "is_paid_activity": true,
                  "tips": "Cómo evitar filas o mejor punto para fotos.",
                  "activity_theme": "cultural"
                },
                {
                  "time": "Almuerzo",
                  "name": "Restaurante de comida típica",
                  "description": "El plato que no puedes ignorar aquí.",
                  "cost": "$XX USD",
                  "emoji_icon": "🍽️",
                  "location_url": "",
                  "is_paid_activity": true,
                  "tips": "Dato sobre reserva o mesa con vista.",
                  "activity_theme": "food"
                },
                {
                  "time": "Tarde",
                  "name": "Actividad de ocio o paseo por barrio",
                  "description": "Relato de la tarde: qué ver y dónde caminar.",
                  "cost": "Gratis",
                  "emoji_icon": "🚶",
                  "location_url": "",
                  "is_paid_activity": false,
                  "tips": "Vistas imperdibles o rincón secreto.",
                  "activity_theme": "city"
                },
                {
                  "time": "Cena",
                  "name": "Cena con Ambiente / Fine Dining",
                  "description": "Experiencia nocturna gastronómica.",
                  "cost": "$XX USD",
                  "emoji_icon": "🍷",
                  "location_url": "",
                  "is_paid_activity": true,
                  "tips": "Recomendación de trago o mesa.",
                  "activity_theme": "food"
                },
                {
                  "time": "Noche",
                  "name": "Bar / Música en vivo / Club",
                  "description": "Cómo se vive la noche en este lugar.",
                  "cost": "$XX USD / Gratis",
                  "emoji_icon": "🍸",
                  "location_url": "",
                  "is_paid_activity": true,
                  "tips": "Trago insignia del bar.",
                  "activity_theme": "party"
                }
              ]
            }
          ]
        }

        REGLA CRÍTICA: Debes incluir EXACTAMENTE las 6 actividades (Desayuno, Mañana, Almuerzo, Tarde, Cena, Noche) para CADA DÍA del itinerario. No omitas ninguna.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      let plan = JSON.parse(cleanJson);

      // Post-Processing: Inject Safe Images based on Themes (Legacy Mode but with expanded dictionary)
      if (plan.itinerary) {
        plan.itinerary.forEach((day: any) => {
           if (day.activities) {
               day.activities.forEach((act: any) => {
                   // Fallback to 'city' if theme is missing or invalid
                   const theme = (act.activity_theme && ['snow', 'beach', 'desert', 'mountain', 'city', 'jungle', 'ocean', 'food', 'cultural', 'party'].includes(act.activity_theme)) 
                        ? act.activity_theme 
                        : 'city';
                   
                   act.image_url = getRandomImg(theme);
                   act.thumb_urls = getThumbnails(theme);
               });
           }
        });
      }

      // Post-Processing: Inject Affiliate Links
      // Default Origin: Santiago/SCL (As per user context/demo)
      plan = AffiliateService.enrichPlanWithLinks(plan, "SCL");

      return plan;

    } catch (error) {
      console.error("Brain Freeze! 🧠❄️", error);
      return null;
    }
  }
}
