import React, { useState } from "react";
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  Tooltip,
  useMap 
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface Destination {
  id: string;
  name: string;
  country: string;
  type: "city" | "country";
  coordinates: [number, number]; // [longitude, latitude]
  baseCostPerDay: number;
  flightCostEstimate: number; // New: region-specific flight cost from SCL
  climate: "Frío" | "Calor" | "Templado";
  themes: ("playa" | "nieve" | "romance" | "aventura" | "ciudad" | "naturaleza")[];
}

export const VALIDATED_DESTINATIONS: Destination[] = [
  // --- LATAM ---
  { id: "rio-de-janeiro", name: "Río de Janeiro", country: "Brasil", type: "city", coordinates: [-43.1729, -22.9068], baseCostPerDay: 45000, flightCostEstimate: 220000, climate: "Calor", themes: ["playa", "ciudad", "romance"] },
  { id: "sao-paulo", name: "São Paulo", country: "Brasil", type: "city", coordinates: [-46.6333, -23.5505], baseCostPerDay: 50000, flightCostEstimate: 210000, climate: "Templado", themes: ["ciudad", "aventura"] },
  { id: "buenos-aires", name: "Buenos Aires", country: "Argentina", type: "city", coordinates: [-58.3816, -34.6037], baseCostPerDay: 35000, flightCostEstimate: 95000, climate: "Templado", themes: ["ciudad", "romance"] },
  { id: "mendoza", name: "Mendoza", country: "Argentina", type: "city", coordinates: [-68.8458, -32.8902], baseCostPerDay: 40000, flightCostEstimate: 80000, climate: "Templado", themes: ["aventura", "romance"] },
  { id: "santiago", name: "Santiago", country: "Chile", type: "city", coordinates: [-70.6693, -33.4489], baseCostPerDay: 60000, flightCostEstimate: 20000, climate: "Templado", themes: ["ciudad", "aventura", "nieve"] },
  { id: "san-pedro", name: "San Pedro de Atacama", country: "Chile", type: "city", coordinates: [-68.1997, -22.9106], baseCostPerDay: 80000, flightCostEstimate: 85000, climate: "Calor", themes: ["aventura"] },
  { id: "lima", name: "Lima", country: "Perú", type: "city", coordinates: [-77.0428, -12.0464], baseCostPerDay: 40000, flightCostEstimate: 280000, climate: "Templado", themes: ["ciudad", "aventura"] },
  { id: "cusco", name: "Cusco", country: "Perú", type: "city", coordinates: [-71.9675, -13.5319], baseCostPerDay: 45000, flightCostEstimate: 320000, climate: "Frío", themes: ["aventura", "ciudad"] },
  { id: "cancun", name: "Cancún", country: "México", type: "city", coordinates: [-86.8515, 21.1619], baseCostPerDay: 90000, flightCostEstimate: 480000, climate: "Calor", themes: ["playa", "romance"] },

  // --- NORTH AMERICA ---
  { id: "nyc", name: "Nueva York", country: "EE.UU.", type: "city", coordinates: [-74.0060, 40.7128], baseCostPerDay: 160000, flightCostEstimate: 650000, climate: "Templado", themes: ["ciudad", "aventura"] },
  { id: "miami", name: "Miami", country: "EE.UU.", type: "city", coordinates: [-80.1918, 25.7617], baseCostPerDay: 140000, flightCostEstimate: 620000, climate: "Calor", themes: ["playa", "ciudad"] },

  // --- EUROPE ---
  { id: "paris", name: "París", country: "Francia", type: "city", coordinates: [2.3522, 48.8566], baseCostPerDay: 130000, flightCostEstimate: 950000, climate: "Templado", themes: ["ciudad", "romance"] },
  { id: "madrid", name: "Madrid", country: "España", type: "city", coordinates: [-3.7038, 40.4168], baseCostPerDay: 85000, flightCostEstimate: 850000, climate: "Templado", themes: ["ciudad", "romance"] },
  { id: "barcelona", name: "Barcelona", country: "España", type: "city", coordinates: [2.1734, 41.3851], baseCostPerDay: 95000, flightCostEstimate: 870000, climate: "Calor", themes: ["playa", "ciudad"] },
  { id: "roma", name: "Roma", country: "Italia", type: "city", coordinates: [12.4964, 41.9028], baseCostPerDay: 100000, flightCostEstimate: 940000, climate: "Templado", themes: ["ciudad", "romance"] },

  // --- ASIA & OCEANIA ---
  { id: "tokio", name: "Tokio", country: "Japón", type: "city", coordinates: [139.6917, 35.6895], baseCostPerDay: 120000, flightCostEstimate: 1200000, climate: "Templado", themes: ["ciudad", "romance", "aventura"] },
  { id: "seul", name: "Seúl", country: "Corea del Sur", type: "city", coordinates: [126.9780, 37.5665], baseCostPerDay: 95000, flightCostEstimate: 1300000, climate: "Templado", themes: ["ciudad", "aventura"] },
  { id: "bali", name: "Bali", country: "Indonesia", type: "city", coordinates: [115.1889, -8.4095], baseCostPerDay: 35000, flightCostEstimate: 1400000, climate: "Calor", themes: ["playa", "naturaleza", "romance"] },
  { id: "bangkok", name: "Bangkok", country: "Tailandia", type: "city", coordinates: [100.5018, 13.7563], baseCostPerDay: 40000, flightCostEstimate: 1050000, climate: "Calor", themes: ["playa", "aventura", "ciudad"] },
  { id: "sydney", name: "Sídney", country: "Australia", type: "city", coordinates: [151.2093, -33.8688], baseCostPerDay: 130000, flightCostEstimate: 950000, climate: "Templado", themes: ["playa", "ciudad"] },

  // --- MIDDLE EAST & AFRICA ---
  { id: "dubai", name: "Dubai", country: "EAU", type: "city", coordinates: [55.2708, 25.2048], baseCostPerDay: 150000, flightCostEstimate: 1100000, climate: "Calor", themes: ["ciudad", "aventura"] },
  { id: "estambul", name: "Estambul", country: "Turquía", type: "city", coordinates: [28.9784, 41.0082], baseCostPerDay: 65000, flightCostEstimate: 1050000, climate: "Templado", themes: ["ciudad", "romance"] },
  { id: "marrakech", name: "Marrakech", country: "Marruecos", type: "city", coordinates: [-7.9811, 31.6295], baseCostPerDay: 55000, flightCostEstimate: 1200000, climate: "Calor", themes: ["aventura", "ciudad"] },
  { id: "ciudad-del-cabo", name: "Ciudad del Cabo", country: "Sudáfrica", type: "city", coordinates: [18.4233, -33.9249], baseCostPerDay: 80000, flightCostEstimate: 1100000, climate: "Templado", themes: ["naturaleza", "playa"] },

  // --- OTHER ---
  { id: "reykjavik", name: "Reikiavik", country: "Islandia", type: "city", coordinates: [-21.8277, 64.1265], baseCostPerDay: 160000, flightCostEstimate: 1400000, climate: "Frío", themes: ["nieve", "aventura", "naturaleza"] },
];

interface InteractiveMapProps {
  onToggleDestination: (id: string, isValid: boolean) => void;
  selectedDestinations: string[];
  budget: number;
  days: number;
  climates: string[];
  selectedThemes: string[];
  isDarkMode: boolean;
  searchQuery?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  onToggleDestination,
  selectedDestinations,
  budget,
  days,
  climates,
  selectedThemes,
  isDarkMode,
  searchQuery = "",
}) => {
  const checkValidity = (dest: Destination) => {
    // Dynamic estimate based on dest properties
    const flightCost = dest.flightCostEstimate; 
    const requiredBudget = flightCost + (dest.baseCostPerDay * days);
    
    const isBudgetValid = budget >= requiredBudget;
    const isClimateValid = climates.length > 0 ? climates.includes(dest.climate) : true;
    const isThemeValid = selectedThemes.length > 0 ? selectedThemes.some(t => dest.themes.includes(t as any)) : true;
    
    // Search filter
    const searchMatch = searchQuery === "" || 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      dest.country.toLowerCase().includes(searchQuery.toLowerCase());

    return isBudgetValid && isClimateValid && isThemeValid && searchMatch;
  };

  // Custom Icon builder
  const createCustomIcon = (isValid: boolean, isSelected: boolean) => {
    let dotColor = "#10b981"; // green for valid
    if (isSelected) dotColor = "#0db9f2"; // cyan 
    if (!isValid) dotColor = "#94a3b8"; // gray

    const size = isSelected ? 20 : 16;
    const innerSize = isSelected ? 12 : 8;

    return L.divIcon({
      className: "custom-div-icon",
      html: `
        <div style="
          background-color: white;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          border: 2px solid ${isSelected ? '#0db9f2' : 'transparent'};
          transition: all 0.3s ease;
        ">
          <div style="
            background-color: ${dotColor};
            width: ${innerSize}px;
            height: ${innerSize}px;
            border-radius: 50%;
          "></div>
        </div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      <MapContainer
        center={[0, 20]}
        zoom={2.5}
        minZoom={2}
        className="w-full h-full z-0"
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        {VALIDATED_DESTINATIONS.map((dest) => {
          const isValid = checkValidity(dest);
          const isSelected = selectedDestinations.includes(dest.id);
          
          if (searchQuery !== "" && !dest.name.toLowerCase().includes(searchQuery.toLowerCase()) && !dest.country.toLowerCase().includes(searchQuery.toLowerCase())) {
             return null;
          }

          return (
            <Marker
              key={dest.id}
              position={[dest.coordinates[1], dest.coordinates[0]]}
              icon={createCustomIcon(isValid, isSelected)}
              eventHandlers={{
                click: () => onToggleDestination(dest.id, isValid),
              }}
            >
              <Tooltip
                direction="top"
                offset={[0, -10]}
                opacity={1}
                permanent={isSelected}
                className="font-bold rounded-lg shadow-xl !bg-white/90 !text-slate-800 !border-0 backdrop-blur-md"
              >
                {dest.name}
              </Tooltip>
              <Popup className="custom-popup">
                <div className={`p-2 min-w-[150px] ${isDarkMode ? "text-slate-900" : ""}`}>
                  <h3 className="font-black text-lg m-0">{dest.name}</h3>
                  <p className="text-xs text-slate-500 mb-2 uppercase tracking-tight">{dest.country}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold">{dest.climate}</span>
                    <span className="bg-brand-cyan/10 text-brand-cyan px-2 py-0.5 rounded text-[10px] font-bold">{dest.type}</span>
                  </div>

                  <div className="border-t pt-2 mt-2">
                     <p className="text-sm font-bold flex justify-between">
                        <span>Diario:</span>
                        <span className="text-brand-cyan">${dest.baseCostPerDay.toLocaleString('es-CL')}</span>
                     </p>
                     <p className="text-[10px] text-slate-400">Est. total para {days} días</p>
                  </div>

                  <button 
                    onClick={() => onToggleDestination(dest.id, isValid)}
                    className={`w-full mt-3 py-2 rounded-xl text-xs font-black transition-all
                      ${isSelected 
                        ? "bg-red-500 text-white hover:bg-red-600" 
                        : "bg-brand-cyan text-white hover:bg-brand-cyan/90"}
                    `}
                  >
                    {isSelected ? "QUITAR DE LA RUTA" : "AÑADIR A LA RUTA"}
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
