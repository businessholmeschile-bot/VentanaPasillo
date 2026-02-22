import { supabase } from '../lib/supabaseClient';
import { TravelPlan } from './aiPlanner';

// --- Trip Service ---

// Interface for what we Save
export interface SavedTrip {
  id?: string;
  created_at?: string;
  destination: string;
  duration_days: number;
  message?: string; // Optional user message/context
}

// 1. Save Trip Function (Fase 1: Motor estático -> BD)
export const saveTripToDB = async (plan: TravelPlan, originalQuery: string) => {
  try {
    const { data, error } = await supabase
      .from('trips')
      .insert([
        { 
          destination: plan.destination_name, 
          // Extract "3 days" logic if possible, default to 3 for now or parse from query
          duration_days: 3, 
          travel_plan: plan,
          // session_id: 'anon_session_123' // We will implement session tracking later
        },
      ])
      .select();

    if (error) {
      console.error('Error saving trip to Supabase:', error);
      return null;
    }

    console.log('Trip saved successfully:', data);
    return data;
  } catch (err) {
    console.error('Unexpected error in saveTripToDB:', err);
    return null;
  }
};

// 2. Fetch Recent Trips (For "Trending Destinations" or User History)
export const getRecentTrips = async (limit = 5) => {
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching trips:', error);
    return [];
  }
  return data;
};

// --- Analytics Service (Monetization Law) ---

export const trackClick = async (type: 'flight' | 'hotel' | 'secret', name: string, destination: string, url: string) => {
  // Fire and forget mechanism
  supabase
    .from('clicks')
    .insert([{ element_type: type, element_name: name, destination, url_clicked: url }])
    .then(({ error }) => {
      if (error) console.error('Error tracking click:', error);
    });
};
