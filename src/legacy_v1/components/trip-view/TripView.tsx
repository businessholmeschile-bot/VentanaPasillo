import React, { useEffect } from 'react';
import TripHeader from './TripHeader';
import ItineraryDay from './ItineraryDay';
import TripSidebar from './TripSidebar';
import PremiumUpgradeCTA from './PremiumUpgradeCTA';
import { TravelData } from '../../services/aiPlanner';

interface TripViewProps {
  data: TravelData;
}

const TripView: React.FC<TripViewProps> = ({ data }) => {
  
  // Transform data for Day 1 display
  const title = (data as any)?.summary?.split(':')[0] || "Inmersión en el Destino";
  
  // Only take the first 3 activities for the Day 1 Preview as per screenshot
  // In a real app we would map days properly.
  const day1Activities = data.itinerary[0]?.activities || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B1116] pb-32">
      <TripHeader data={data} />
      
      {/* Spacer for fixed header */}
      <div className="h-16"></div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-20 relative z-20">
        <div className="grid md:grid-cols-12 gap-12">
          
          {/* Left Column: Itinerary (8 cols) */}
          <div className="md:col-span-8 space-y-24">
             {/* Render All Days from Itinerary */}
             {data.itinerary.map((day) => (
               <ItineraryDay 
                  key={day.day}
                  day={day.day} 
                  title={day.title || `Día ${day.day}`} 
                  activities={day.activities} 
               />
             ))}

             {/* Premium Upsell Section (Not blocking content) */}
             <PremiumUpgradeCTA />
          </div>

          {/* Right Column: Sidebar (4 cols) */}
          <div className="md:col-span-4 hidden md:block">
             <TripSidebar data={data} totalCost={1450} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default TripView;
