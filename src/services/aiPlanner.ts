import { Plane, Hotel, Map, Loader2 } from 'lucide-react';

// Interfaces actualizadas con más detalle (basado en el feedback de Positano)
export interface Activity {
  id: string; // New: Unique ID for interaction
  time: 'Desayuno' | 'Mañana' | 'Almuerzo' | 'Tarde' | 'Cena' | 'Noche';
  name: string;
  description: string;
  cost: string;
  emoji_icon: string;
  location_url: string;
  is_paid_activity: boolean;
  tips?: string; 
  image_url?: string; 
  thumb_urls?: string[]; 
  activity_theme?: string; 
}

export interface Day {
  day: number;
  title: string;
  activities: Activity[];
}

export interface TravelPlan {
  destination_name: string;
  summary: string;
  traveler_type?: string; // e.g., "Pareja", "Solo", "Familia"
  trip_vibe?: string; // e.g., "Relax", "Aventura", "Fiesta"
  flight_fast: {
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
  flight_cheap: {
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

export type TravelData = TravelPlan; // Alias compatible with current usage

// Smart Logic Brain
const detectTravelerProfile = (query: string) => {
    const q = query.toLowerCase();
    
    // Default Profile
    let profile = {
        type: "Viajeros",
        vibe: "Equilibrado",
        budget: "Moderado"
    };

    // Detect Type
    if (q.includes('solo') || q.includes('sola')) profile.type = "Solo Traveler";
    else if (q.includes('pareja') || q.includes('luna de miel') || q.includes('novios')) profile.type = "Pareja";
    else if (q.includes('familia') || q.includes('niños')) profile.type = "Familia";
    else if (q.includes('amigos') || q.includes('grupo')) profile.type = "Grupo de Amigos";

    // Detect Vibe
    if (q.includes('fiesta') || q.includes('noche') || q.includes('joda')) profile.vibe = "Fiesta & Vida Nocturna";
    else if (q.includes('relax') || q.includes('descanso') || q.includes('playa')) profile.vibe = "Relax & Naturaleza";
    else if (q.includes('aventura') || q.includes('trekking')) profile.vibe = "Aventura Extrema";
    else if (q.includes('cultura') || q.includes('historia')) profile.vibe = "Cultura & Historia";

    // Detect Budget
    if (q.includes('barato') || q.includes('mochilero') || q.includes('economico')) profile.budget = "Económico";
    else if (q.includes('lujo') || q.includes('vip') || q.includes('5 estrellas')) profile.budget = "Lujo";

    return profile;
};

// Image Logic Shared Exports
export const themes: Record<string, string[]> = {
    // 1. SNOW / WINTER / ARCTIC
    snow: [
        "1517299321609-52687d1bc555", // Skiing
        "1548266643-87037912a5db", // Snowy Mountain
        "1483664852095-d6cc6870705d", // Winter Cabin
        "1516466723877-e4ec1d736c8a", // Snow Forest
        "1491002052546-bf78f400bb56", // Glacier
        "1612257993081-235f726e472d"  // Aurora Borealis
    ],
    // 2. BEACH / TROPICAL
    beach: [
        "1507525428034-b723cf961d3e", // Tropical Beach
        "1596895430036-37f4d6d77356", // Turtle / Underwater
        "1540946405-e05f1d105c28", // Palm Trees
        "1499729176431-7b19810a9042", // Kayak Blue Water
        "1585672688463-c7827827464a", // Surf
        "1537894727189-612470725a38"  // Maldives style deck
    ],
    // 3. DESERT / DUNES
    desert: [
        "1509316975850-ff9c5deb0cd9", // Dunes
        "1682685767223-b6840d0469b6", // Camels
        "1598460592476-c56aeb6371cb", // Morocco Tent
        "1541410965-03714baf876b", // Bedouin
        "1513419083313-2d5c3175402a", // Desert Starry Night
        "1459411552884-841db9b3cc2a"  // Canyon
    ],
    // 4. MOUNTAIN / HIKING
    mountain: [
        "1464822759023-fed622ff2c3b", // Hiking Trail
        "1486870591958-9b9d011c6286", // Mountain Peak
        "1519681393797-a1e943f63519", // Camping Mountain
        "1454447651986-748f24419515", // Alps
        "1551632811-318c883ed78e", // Everest Vibes
        "1485470154868-b77da20be78f"  // Lake Reflection
    ],
    // 5. CITY / URBAN
    city: [
        "1477959858617-67f85e0522d7", // Urban Street
        "1449824913929-163f6fb004eb", // City Skyline
        "1480714378408-67cf0d13bc1b", // New York vibe
        "1514565131-fce0801e586d",    // Tokyo Neon
        "1477414348463-c0eb7f1359b6", // European Street
        "1496564203457-11bb12075d90"  // Rooftop bar
    ],
    // 6. JUNGLE / RAINFOREST
    jungle: [
        "1596781256920-562db44d47b0", // Amazon River
        "1518020382-f4eb275e74c6",    // Deep Green Jungle
        "1542457811-9a706b453ec4",    // Waterfall
        "1503431355157-12822da877c9", // Monkey / Wildlife
        "1580974852861-c30da9556847", // Lodge in Jungle
        "1571052602701-4470ec74d320"  // Bamboo Forest
    ],
    // 7. OCEAN / SEAS
    ocean: [
        "1582967788607-27a37096089e", // Open Ocean
        "1514414876798-250c604be12e", // Sailboat
        "1588631168433-8a9d0f04c643", // Coral Reef
        "1682687220067-d79039649b6b", // Whale
        "1581775837265-27a37096089e", // Deep Blue
        "1545638217-101f37500593"     // Luxury Yacht
    ],
    // 8. FOOD / GASTRONOMY
    food: [
        "1504674900247-0877df9cc836", // Fine Dining
        "1476224203421-9ac39bcb3327", // Street Food
        "1414235077428-338989a2e8c0", // Restaurant Vibe
        "1565299624946-b28f40a0ae38", // Pizza/Pasta
        "1555939594-58d7cb561ad1",    // BBQ
        "1512621776951-a57141f2eefd"  // Healthy Bowl
    ],
    // 9. CULTURAL / SPIRITUAL / MUSEUM
    cultural: [
        "1566127444979-b3d2b654e3d7", // Museum Art
        "1549140660-39456e3009d7",    // Ancient Ruins
        "1518998053901-530697d23fd9", // Asian Temple
        "1582555172866-fc5d30dd740c", // European History
        "1602167156943-3ff70fdb848d", // Monk / Spiritual
        "1523531294911-37d13ca661c9"  // Church/Cathedral
    ],
    // 10. PARTY / NIGHTLIFE
    party: [
        "1566737236500-c8ac43014a67", // Concert
        "1570158268183-d296b2892211", // Club
        "1514525253440-b393452e3383", // Drinks Friends
        "1533174072545-2b95a7203b36", // Rooftop Night
        "1492684223066-81342ee5ff30", // Fire
        "1516450360452-9312f5e86fc7"  // Festival
    ]
};

export const getRandomImg = (theme: string) => {
    const ids = themes[theme] || themes['city'];
    return `https://images.unsplash.com/photo-${ids[Math.floor(Math.random() * ids.length)]}?auto=format&fit=crop&q=80&w=800`;
};

export const getThumbnails = (theme: string) => {
    const ids = themes[theme] || themes['city'];
    // Get 3 random unique images
    const shuffled = [...ids].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3).map(id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=60&w=200`);
};

// Generador Procedural (El "Cerebro de Emergencia")
export const generateProceduralPlan = (query: string): TravelPlan => {
  // Robust extraction: Everything between "Viaje a" and "por"
  const startTarget = "Viaje a ";
  const endTarget = " por ";
  const startIndex = query.indexOf(startTarget);
  const endIndex = query.indexOf(endTarget);
  
  let destinationName = "Tu Destino";
  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    destinationName = query.substring(startIndex + startTarget.length, endIndex).trim();
  }
  
  const capitalizedDest = destinationName.charAt(0).toUpperCase() + destinationName.slice(1);
  const cleanDestination = destinationName; 

  const profile = detectTravelerProfile(query);

  // Detect Duration
  const durationMatch = query.match(/(\d+)\s*(dias|days|días)/i);
  let duration = durationMatch ? parseInt(durationMatch[1]) : 5; 
  if (duration > 14) duration = 14; 

  // Dynamic Logic for Itinerary Construction
  const generateActivities = (dayNum: number): Activity[] => {
    const isAfternoonPaid = dayNum % 2 === 0;

    return [
      {
        id: `${dayNum}-breakfast`,
        time: "Desayuno",
        name: "Desayuno Local Auténtico",
        description: `Comienza el día en una cafetería histórica o mercado para probar el desayuno típico de ${capitalizedDest}.`,
        cost: "$8.500 - $12.000 CLP",
        emoji_icon: "☕",
        location_url: "",
        is_paid_activity: true,
        tips: "Pide la especialidad de la casa.",
        image_url: getRandomImg('food'),
        thumb_urls: getThumbnails('food'),
        activity_theme: "food"
      },
      {
        id: `${dayNum}-morning`,
        time: "Mañana",
        name: `Visita a Icono: ${capitalizedDest}`,
        description: profile.vibe === "Relax & Naturaleza" 
            ? "Exploración de senderos naturales o playas vírgenes cercanas."
            : "Recorrido por los puntos históricos y monumentos más emblemáticos de la zona.",
        cost: isAfternoonPaid ? "$20.000 CLP" : "Gratis",
        emoji_icon: profile.vibe === "Relax & Naturaleza" ? "🌿" : "🏛️",
        location_url: "",
        is_paid_activity: isAfternoonPaid,
        tips: "Ve temprano para evitar multitudes.",
        image_url: profile.vibe === "Relax & Naturaleza" ? getRandomImg('nature') : getRandomImg('city'),
        thumb_urls: getThumbnails(profile.vibe === "Relax & Naturaleza" ? 'nature' : 'city'),
        activity_theme: profile.vibe === "Relax & Naturaleza" ? "mountain" : "cultural"
      },
      {
        id: `${dayNum}-lunch`,
        time: "Almuerzo",
        name: "Experiencia Gastronómica",
        description: `Prueba el plato insignia de ${capitalizedDest} en un ${profile.budget === "Económico" ? "mercado tradicional" : "restaurante con vista"}.`,
        cost: profile.budget === "Económico" ? "$15.000 CLP" : "$45.000 CLP",
        emoji_icon: "🍽️",
        location_url: "",
        is_paid_activity: true,
        tips: "Pregunta por el menú del día.",
        image_url: getRandomImg('food'),
        thumb_urls: getThumbnails('food'),
        activity_theme: "food"
      },
      {
        id: `${dayNum}-afternoon`,
        time: "Tarde",
        name: !isAfternoonPaid ? "Aventura / Cultura" : "Paseo y Relax",
        description: !isAfternoonPaid 
            ? "Entrada a uno de los museos principales o una actividad de aventura local." 
            : "Recorrido a pie por barrios pintorescos o relax frente al mar.",
        cost: !isAfternoonPaid ? "$25.000 CLP" : "Gratis",
        emoji_icon: !isAfternoonPaid ? "🎫" : "🚶",
        location_url: "",
        is_paid_activity: !isAfternoonPaid,
        image_url: !isAfternoonPaid ? getRandomImg('cultural') : getRandomImg('city'),
        tips: "Ideal para capturar el atardecer.",
        thumb_urls: getThumbnails(!isAfternoonPaid ? 'cultural' : 'city'),
        activity_theme: !isAfternoonPaid ? "cultural" : "city"
      },
      {
        id: `${dayNum}-dinner`,
        time: "Cena",
        name: "Cena con Estilo",
        description: "Restaurante con atmósfera vibrante para disfrutar de la noche local.",
        cost: "$35.000 - $65.000 CLP",
        emoji_icon: "🍷",
        location_url: "",
        is_paid_activity: true,
        image_url: getRandomImg('food'),
        thumb_urls: getThumbnails('food'),
        activity_theme: "food"
      },
      {
        id: `${dayNum}-night`,
        time: "Noche",
        name: "Vibra Nocturna",
        description: "Bar de tragos de autor, club de música en vivo o un paseo bajo las estrellas.",
        cost: "Variable",
        emoji_icon: "🍸",
        location_url: "",
        is_paid_activity: true,
        tips: "Prueba el cóctel local.",
        image_url: getRandomImg('party'),
        thumb_urls: getThumbnails('party'),
        activity_theme: "party"
      }
    ];
  };

  const itinerary: Day[] = [];
  for (let i = 1; i <= duration; i++) {
    itinerary.push({
      day: i,
      title: i === 1 ? "Llegada y Reconocimiento" : i === duration ? "Despedida y Compras" : `Exploración Día ${i}`,
      activities: generateActivities(i)
    });
  }

  return {
    destination_name: capitalizedDest,
    summary: `Tu ruta de ${duration} días en ${capitalizedDest}, curada para un perfil ${profile.type} con vibra ${profile.vibe}. Andy ha optimizado cada parada para ajustarse a tu presupuesto ${profile.budget}.`,
    traveler_type: profile.type,
    trip_vibe: profile.vibe,
    flight_fast: {
      airline: "Buscando Aerolíneas...",
      route: `Tu Ciudad -> ${capitalizedDest}`,
      price_estimate: "Calculando tarifas...",
      duration: "Depende de conexión",
      stops: "Directo",
      emoji_icon: "✈️",
      call_to_action: `Velocidad Máxima a ${capitalizedDest}`,
      affiliate_link: `https://www.skyscanner.com/transport/flights/scl/${cleanDestination.toLowerCase().substring(0,3)}`, 
      tag_color: "#00C2FF"
    },
    flight_cheap: {
      airline: "Low Cost / Escalas",
      route: `Tu Ciudad -> ${capitalizedDest}`,
      price_estimate: "Calculando tarifas...",
      duration: "Depende de conexión",
      stops: "1+ Escalas",
      emoji_icon: "🛫",
      call_to_action: `Opción Ahorro a ${capitalizedDest}`,
      affiliate_link: `https://www.skyscanner.com/transport/flights/scl/${cleanDestination.toLowerCase().substring(0,3)}`, 
      tag_color: "#FF9F66"
    },
    hotels_suggestion: [
      {
        name: profile.budget === "Lujo" ? `Grand Hotel ${capitalizedDest}` : `Hostel Central ${capitalizedDest}`,
        location: "Zona Turística Principal",
        price_night: profile.budget === "Lujo" ? "$250.000+ CLP" : "$45.000 - $80.000 CLP",
        reason_to_book: profile.type === "Solo Traveler" ? "Excelente ambiente social para conocer gente." : "Máxima comodidad y servicios exclusivos.",
        emoji_icon: "bed",
        call_to_action: "Ver Disponibilidad",
        affiliate_link: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(capitalizedDest)}`,
        tag_color: "#00C2FF",
        badges: [profile.budget === "Lujo" ? "Luxury" : "Best Value", profile.type === "Pareja" ? "Romantic" : "Central"]
      },
      {
        name: `Opción Boutique`,
        location: `Barrio Bohemio`,
        price_night: "$100.000 - $150.000 CLP",
        reason_to_book: "Diseño único y atención personalizada.",
        emoji_icon: "coffee",
        call_to_action: "Ver Ofertas",
        affiliate_link: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(capitalizedDest)}`,
        tag_color: "#FF9F66",
        badges: ["Design", "Charm"]
      }
    ],
    local_secrets: [
      {
        title: profile.vibe === "Fiesta & Vida Nocturna" ? "El Bar Escondido" : "Jardín Secreto",
        description: profile.vibe === "Fiesta & Vida Nocturna" ? `Pregunta por el speakeasy detrás de la librería.` : `Un parque poco conocido ideal para leer o descansar.`,
        type: profile.vibe === "Fiesta & Vida Nocturna" ? "Nightlife" : "Relax",
        emoji_icon: profile.vibe === "Fiesta & Vida Nocturna" ? "🍸" : "🌳",
        tag_color: "#00C2FF"
      },
      {
        title: "Mercado Local",
        description: `Pregunta por el mercado central de ${capitalizedDest}.`,
        type: "Foodie Hack",
        emoji_icon: "🍎",
        tag_color: "#FF9F66"
      }
    ],
    itinerary: itinerary
  };
};
