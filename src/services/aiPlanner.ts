import { Plane, Hotel, Map, Loader2 } from 'lucide-react';

// Interfaces actualizadas con más detalle (basado en el feedback de Positano)
export interface Activity {
  time: string;
  name: string;
  description: string;
  cost: string;
  emoji_icon: string;
  location_url: string;
  is_paid_activity: boolean;
  tips?: string; // Nuevo: "Qué pedir", "Mejor hora", etc.
}

export interface Day {
  day: number;
  title: string;
  activities: Activity[];
}

export interface TravelPlan {
  destination_name: string;
  summary: string;
  flights_suggestion: {
    airline: string;
    route: string;
    price_estimate: string;
    duration: string;
    stops: string;
    emoji_icon: string;
    call_to_action: string;
    affiliate_link: string;
    tag_color: string;
  };
  hotels_suggestion: Array<{
    name: string;
    location: string;
    price_night: string;
    reason_to_book: string;
    emoji_icon: string;
    call_to_action: string;
    affiliate_link: string;
    tag_color: string;
    badges: string[];
  }>;
  local_secrets: Array<{
    title: string;
    description: string;
    type: string;
    emoji_icon: string;
    tag_color: string;
  }>;
  itinerary: Day[];
}

// Generador Procedural (El "Cerebro de Emergencia")
export const generateProceduralPlan = (query: string): TravelPlan => {
  // Limpiamos la query para obtener un nombre de destino usable
  // Ej: "Pucón 3 días" -> "Pucón"
  const cleanDestination = query.replace(/\b(\d+|dias|days|semana|week|viaje|trip|a|en|to|in)\b/gi, '').trim() || query;
  const capitalizedDest = cleanDestination.charAt(0).toUpperCase() + cleanDestination.slice(1);

  return {
    destination_name: capitalizedDest,
    summary: `Explorando ${capitalizedDest}: Una aventura diseñada a medida. Andy ha detectado este destino y ha estructurado la logística base para tu viaje.`,
    flights_suggestion: {
      airline: "Buscando Aerolíneas...",
      route: `Tu Ciudad -> ${capitalizedDest}`,
      price_estimate: "Calculando tarifas...",
      duration: "Depende de conexión",
      stops: "1 Escala Estimada",
      emoji_icon: "✈️",
      call_to_action: `Ver Vuelos a ${capitalizedDest}`,
      affiliate_link: `https://www.skyscanner.com/transport/flights/scl/${cleanDestination.toLowerCase().substring(0,3)}`, // Intento de link dinámico
      tag_color: "#00C2FF"
    },
    hotels_suggestion: [
      {
        name: `Mejor Hotel en Centro de ${capitalizedDest}`,
        location: "Zona Turística Principal",
        price_night: "$80 - $150 USD",
        reason_to_book: `Ubicación estratégica para recorrer ${capitalizedDest} caminando. Alta valoración de viajeros.`,
        emoji_icon: "bed",
        call_to_action: "Ver Disponibilidad",
        affiliate_link: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(capitalizedDest)}`,
        tag_color: "#00C2FF",
        badges: ["Best Location", "Top Rated"]
      },
      {
        name: `Opción Boutique / B&B`,
        location: `Alrededores de ${capitalizedDest}`,
        price_night: "$60 - $100 USD",
        reason_to_book: "Para una experiencia más auténtica y local.",
        emoji_icon: "coffee",
        call_to_action: "Ver Ofertas",
        affiliate_link: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(capitalizedDest)}`,
        tag_color: "#FF9F66",
        badges: ["Local Vibe", "Charm"]
      }
    ],
    local_secrets: [
      {
        title: "Tour a Pie Gratuito",
        description: `Busca el 'Free Walking Tour' de ${capitalizedDest} tu primer día. Es la mejor forma de ubicarte.`,
        type: "Smart Travel",
        emoji_icon: "🚶",
        tag_color: "#00C2FF"
      },
      {
        title: "Mercado Local",
        description: `Pregunta por el mercado central de ${capitalizedDest}. Ahí comerás mejor y más barato que en los restaurantes turísticos.`,
        type: "Foodie Hack",
        emoji_icon: "🍎",
        tag_color: "#FF9F66"
      }
    ],
    itinerary: [
      {
        day: 1,
        title: "Llegada y Reconocimiento",
        activities: [
          {
            time: "Mañana",
            name: `Centro Histórico de ${capitalizedDest}`,
            description: "Camina por la plaza principal y edificios emblemáticos.",
            cost: "Gratis",
            emoji_icon: "🏛️",
            location_url: "",
            is_paid_activity: false,
            tips: "Lleva zapatos cómodos y agua."
          },
          {
            time: "Tarde",
            name: "Gastronomía Local",
            description: `Prueba el plato típico de ${capitalizedDest} en un restaurante recomendado por locales.`,
            cost: "$20 USD",
            emoji_icon: "🍽️",
            location_url: "",
            is_paid_activity: true,
            tips: "Pregunta al mesero cuál es la especialidad de la casa."
          }
        ]
      },
      {
        day: 2,
        title: "Exploración Profunda",
        activities: [
          {
            time: "Día Completo",
            name: "Atracción Principal / Naturaleza",
            description: `Visita el punto turístico #1 de ${capitalizedDest} o haz una excursión a la naturaleza cercana.`,
            cost: "$30 - $50 USD",
            emoji_icon: "🌲",
            location_url: "",
            is_paid_activity: true,
            tips: "Compra tickets online para evitar filas."
          }
        ]
      }
    ]
  };
};
