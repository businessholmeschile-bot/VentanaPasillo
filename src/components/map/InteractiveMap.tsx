import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export interface Destination {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number]; // [longitude, latitude]
  baseCostPerDay: number;
  climate: "Frío" | "Calor" | "Templado";
  themes: ("playa" | "nieve" | "romance" | "aventura" | "ciudad")[];
}

export const VALIDATED_DESTINATIONS: Destination[] = [
  { id: "argentina", name: "Argentina", country: "Argentina", coordinates: [-58.3816, -34.6037], baseCostPerDay: 50, climate: "Templado", themes: ["aventura", "ciudad", "nieve"] },
  { id: "australia", name: "Australia", country: "Australia", coordinates: [151.2093, -33.8688], baseCostPerDay: 130, climate: "Calor", themes: ["playa", "aventura"] },
  { id: "belgica", name: "Bélgica", country: "Bélgica", coordinates: [4.3517, 50.8503], baseCostPerDay: 110, climate: "Templado", themes: ["ciudad", "romance"] },
  { id: "bolivia", name: "Bolivia", country: "Bolivia", coordinates: [-68.1193, -16.4897], baseCostPerDay: 30, climate: "Templado", themes: ["aventura"] },
  { id: "brasil", name: "Brasil", country: "Brasil", coordinates: [-43.1729, -22.9068], baseCostPerDay: 60, climate: "Calor", themes: ["playa", "romance"] },
  { id: "bulgaria", name: "Bulgaria", country: "Bulgaria", coordinates: [23.3219, 42.6977], baseCostPerDay: 50, climate: "Templado", themes: ["ciudad", "aventura"] },
  { id: "canada", name: "Canadá", country: "Canadá", coordinates: [-79.3832, 43.6532], baseCostPerDay: 120, climate: "Frío", themes: ["nieve", "aventura"] },
  { id: "chile", name: "Chile", country: "Chile", coordinates: [-70.6693, -33.4489], baseCostPerDay: 70, climate: "Templado", themes: ["aventura", "nieve", "ciudad"] },
  { id: "china", name: "China", country: "China", coordinates: [116.4074, 39.9042], baseCostPerDay: 70, climate: "Templado", themes: ["ciudad", "aventura"] },
  { id: "colombia", name: "Colombia", country: "Colombia", coordinates: [-74.0721, 4.7110], baseCostPerDay: 40, climate: "Calor", themes: ["playa", "aventura"] },
  { id: "croacia", name: "Croacia", country: "Croacia", coordinates: [15.9819, 45.8150], baseCostPerDay: 70, climate: "Templado", themes: ["playa", "ciudad"] },
  { id: "ecuador", name: "Ecuador", country: "Ecuador", coordinates: [-78.4678, -0.1807], baseCostPerDay: 40, climate: "Calor", themes: ["aventura", "playa"] },
  { id: "eslovaquia", name: "Eslovaquia", country: "Eslovaquia", coordinates: [17.1077, 48.1486], baseCostPerDay: 60, climate: "Templado", themes: ["ciudad", "nieve"] },
  { id: "espana", name: "España", country: "España", coordinates: [-3.7038, 40.4168], baseCostPerDay: 90, climate: "Calor", themes: ["playa", "ciudad", "romance"] },
  { id: "estados-unidos", name: "Estados Unidos", country: "Estados Unidos", coordinates: [-74.0060, 40.7128], baseCostPerDay: 150, climate: "Templado", themes: ["ciudad", "aventura"] },
  { id: "falkland-islands", name: "Falkland Is.", country: "Falkland Islands", coordinates: [-57.8492, -51.6977], baseCostPerDay: 100, climate: "Frío", themes: ["aventura"] },
  { id: "filipinas", name: "Filipinas", country: "Filipinas", coordinates: [120.9842, 14.5995], baseCostPerDay: 45, climate: "Calor", themes: ["playa", "aventura"] },
  { id: "francia", name: "Francia", country: "Francia", coordinates: [2.3522, 48.8566], baseCostPerDay: 130, climate: "Templado", themes: ["ciudad", "romance"] },
  { id: "alemania", name: "Alemania", country: "Alemania", coordinates: [13.4050, 52.5200], baseCostPerDay: 110, climate: "Templado", themes: ["ciudad", "aventura"] },
  { id: "grecia", name: "Grecia", country: "Grecia", coordinates: [23.7275, 37.9838], baseCostPerDay: 80, climate: "Calor", themes: ["playa", "romance"] },
  { id: "hong-kong", name: "Hong Kong", country: "Hong Kong", coordinates: [114.1694, 22.3193], baseCostPerDay: 130, climate: "Calor", themes: ["ciudad"] },
  { id: "hungria", name: "Hungría", country: "Hungría", coordinates: [19.0402, 47.4979], baseCostPerDay: 60, climate: "Templado", themes: ["ciudad", "romance"] },
  { id: "indonesia", name: "Indonesia", country: "Indonesia", coordinates: [115.1889, -8.4095], baseCostPerDay: 40, climate: "Calor", themes: ["playa", "romance", "aventura"] },
  { id: "inglaterra", name: "Inglaterra", country: "Inglaterra", coordinates: [-0.1276, 51.5074], baseCostPerDay: 140, climate: "Templado", themes: ["ciudad", "romance"] },
  { id: "irlanda", name: "Irlanda", country: "Irlanda", coordinates: [-6.2603, 53.3498], baseCostPerDay: 120, climate: "Templado", themes: ["ciudad", "aventura"] },
  { id: "islandia", name: "Islandia", country: "Islandia", coordinates: [-21.9426, 64.1466], baseCostPerDay: 160, climate: "Frío", themes: ["aventura", "nieve"] },
  { id: "italia", name: "Italia", country: "Italia", coordinates: [12.4964, 41.9028], baseCostPerDay: 100, climate: "Templado", themes: ["ciudad", "romance"] },
  { id: "jordania", name: "Jordania", country: "Jordania", coordinates: [35.9284, 31.9522], baseCostPerDay: 70, climate: "Calor", themes: ["aventura"] },
  { id: "libano", name: "Líbano", country: "Líbano", coordinates: [35.5018, 33.8938], baseCostPerDay: 80, climate: "Calor", themes: ["aventura", "ciudad"] },
  { id: "macedonia-del-norte", name: "Macedonia", country: "Macedonia del Norte", coordinates: [21.4279, 42.0003], baseCostPerDay: 40, climate: "Templado", themes: ["ciudad", "aventura"] },
  { id: "mexico", name: "México", country: "México", coordinates: [-99.1332, 19.4326], baseCostPerDay: 60, climate: "Calor", themes: ["playa", "romance"] },
  { id: "nueva-zelanda", name: "N. Zelanda", country: "Nueva Zelanda", coordinates: [174.7633, -36.8485], baseCostPerDay: 120, climate: "Templado", themes: ["aventura", "nieve"] },
  { id: "panama", name: "Panamá", country: "Panamá", coordinates: [-79.5199, 8.9824], baseCostPerDay: 70, climate: "Calor", themes: ["playa", "ciudad"] },
  { id: "paraguay", name: "Paraguay", country: "Paraguay", coordinates: [-57.6359, -25.2865], baseCostPerDay: 35, climate: "Calor", themes: ["ciudad"] },
  { id: "peru", name: "Perú", country: "Perú", coordinates: [-77.0428, -12.0464], baseCostPerDay: 45, climate: "Calor", themes: ["aventura"] },
  { id: "polonia", name: "Polonia", country: "Polonia", coordinates: [21.0122, 52.2297], baseCostPerDay: 65, climate: "Templado", themes: ["ciudad", "romance"] },
  { id: "portugal", name: "Portugal", country: "Portugal", coordinates: [-9.1393, 38.7223], baseCostPerDay: 80, climate: "Calor", themes: ["playa", "ciudad"] },
  { id: "republica-checa", name: "Rep. Checa", country: "República Checa", coordinates: [14.4378, 50.0755], baseCostPerDay: 70, climate: "Templado", themes: ["ciudad", "romance"] },
  { id: "republica-dominicana", name: "Rep. Dom.", country: "República Dominicana", coordinates: [-69.9312, 18.4861], baseCostPerDay: 65, climate: "Calor", themes: ["playa", "romance"] },
  { id: "singapur", name: "Singapur", country: "Singapur", coordinates: [103.8198, 1.3521], baseCostPerDay: 130, climate: "Calor", themes: ["ciudad"] },
  { id: "tailandia", name: "Tailandia", country: "Tailandia", coordinates: [100.5018, 13.7563], baseCostPerDay: 45, climate: "Calor", themes: ["playa", "aventura"] },
  { id: "turquia", name: "Turquía", country: "Turquía", coordinates: [28.9784, 41.0082], baseCostPerDay: 60, climate: "Templado", themes: ["ciudad", "romance"] },
  { id: "uruguay", name: "Uruguay", country: "Uruguay", coordinates: [-56.1645, -34.9011], baseCostPerDay: 60, climate: "Templado", themes: ["playa", "ciudad"] },
  { id: "vaticano", name: "Vaticano", country: "Vaticano", coordinates: [12.4534, 41.9029], baseCostPerDay: 100, climate: "Templado", themes: ["ciudad", "romance"] },
  { id: "vietnam", name: "Vietnam", country: "Vietnam", coordinates: [105.8342, 21.0278], baseCostPerDay: 35, climate: "Calor", themes: ["playa", "aventura"] },
  { id: "holanda", name: "Holanda", country: "Holanda", coordinates: [4.9041, 52.3676], baseCostPerDay: 120, climate: "Templado", themes: ["ciudad", "romance"] },
  { id: "escocia", name: "Escocia", country: "Escocia", coordinates: [-3.1883, 55.9533], baseCostPerDay: 130, climate: "Frío", themes: ["aventura", "ciudad"] },
  { id: "gales", name: "Gales", country: "Gales", coordinates: [-3.1791, 51.4816], baseCostPerDay: 110, climate: "Templado", themes: ["ciudad", "aventura"] }
];

interface InteractiveMapProps {
  budget: number;
  days: number;
  climates: string[];
  selectedThemes: string[];
  selectedDestinations: string[];
  onToggleDestination: (id: string, isValid: boolean) => void;
  isDarkMode: boolean;
}

// Custom hook to handle map style injection securely without interfering with leaflet's dom creation
const MapStyler = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const map = useMap();
  useEffect(() => {
    map.getContainer().style.backgroundColor = isDarkMode ? "#0B1116" : "#E2E8F0";
  }, [isDarkMode, map]);
  return null;
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  budget,
  days,
  climates,
  selectedThemes,
  selectedDestinations,
  onToggleDestination,
  isDarkMode,
}) => {
  const checkValidity = (dest: Destination) => {
    const roughFlightCost = 400; // placeholder base
    const requiredBudget = roughFlightCost + dest.baseCostPerDay * days;
    const isBudgetValid = budget >= requiredBudget;
    const isClimateValid = climates.length > 0 ? climates.includes(dest.climate) : true;
    const isThemeValid = selectedThemes.length > 0 ? selectedThemes.some(t => dest.themes.includes(t as any)) : true;
    return isBudgetValid && isClimateValid && isThemeValid;
  };

  // Custom Icon builder using DivIcon to avoid loading external image assets
  const createCustomIcon = (isValid: boolean, isSelected: boolean) => {
    let circleColor = isDarkMode ? "#3b82f6" : "#2563eb"; // default available
    if (isValid && budget > 0) circleColor = "#10b981"; // viable
    if (!isValid && budget > 0) circleColor = isDarkMode ? "#4b5563" : "#9ca3af"; // not viable
    if (isSelected) circleColor = "#06b6d4"; // selected

    const size = isSelected ? 20 : isValid ? 16 : 14;
    const pulseClass = (isValid && budget > 0 && !isSelected) ? 'animate-pulse' : '';
    
    // Very subtle borders and shadows to avoid the "glitch/trembling" effect
    const htmlString = `
      <div class="relative flex items-center justify-center" style="width: ${size}px; height: ${size}px;">
        <div class="absolute w-full h-full rounded-full ${pulseClass}" style="background-color: ${circleColor}; opacity: 0.8;"></div>
        <div class="absolute rounded-full border-2 border-white shadow-sm" style="width: ${size-4}px; height: ${size-4}px; background-color: ${circleColor};"></div>
      </div>
    `;

    return L.divIcon({
      html: htmlString,
      className: "custom-leaflet-icon",
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  // Choose an elegant satellite raster tile style
  const satelliteTileUrl = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
  // Optional: boundaries and labels wrapper if we want country names natively (optional but helpful)
  const labelsTileUrl = "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}";

  return (
    <div className={`w-full h-full relative transition-colors duration-500 z-0`}>
      <MapContainer 
        center={[20, 10]} 
        zoom={3} 
        minZoom={3}
        maxZoom={8}
        maxBounds={[
          [-85, -180],
          [85, 180]
        ]}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={true} 
        style={{ width: "100%", height: "100%", zIndex: 1 }}
        zoomControl={false}
      >
        <MapStyler isDarkMode={isDarkMode} />
        <TileLayer
          url={satelliteTileUrl}
          noWrap={true}
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EAP, and the GIS User Community'
        />
        <TileLayer
          url={labelsTileUrl}
          noWrap={true}
          attribution=""
        />

        {VALIDATED_DESTINATIONS.map((dest) => {
          const isValid = checkValidity(dest);
          const isSelected = selectedDestinations.includes(dest.id);
          const icon = createCustomIcon(isValid, isSelected);

          return (
            <Marker
              key={dest.id}
              position={[dest.coordinates[1], dest.coordinates[0]]} // Leaflet uses [lat, lng]
              icon={icon}
              eventHandlers={{
                click: () => onToggleDestination(dest.id, isValid)
              }}
            >
              {/* Only show tooltip when selected or valid to keep map clean */}
              {(isSelected || (isValid && budget > 0)) && (
                <Tooltip 
                   direction="top" 
                   offset={[0, -10]} 
                   opacity={1}
                   permanent={isSelected}
                   className="font-bold rounded-lg shadow-xl !bg-white/90 !text-slate-800 !border-0 backdrop-blur-md"
                >
                  {dest.name}
                </Tooltip>
              )}
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
