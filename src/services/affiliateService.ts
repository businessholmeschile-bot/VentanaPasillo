import { TravelPlan } from './aiPlanner';

const TP_MARKER = import.meta.env.VITE_AFFILIATE_TRAVELPAYOUTS_MARKER || "501221";

export class AffiliateService {
    
    // 1. Generate Flight Link (Skyscanner via Travelpayouts)
    static getFlightLink(origin: string, destination: string): string {
        const destCode = destination.substring(0, 3).toUpperCase();
        // Skyscanner via Travelpayouts (p=4411 is Skyscanner)
        const baseUrl = `https://www.skyscanner.com/transport/flights/${origin.toLowerCase().substring(0,3)}/${destCode}`;
        return `https://tp.media/r?marker=${TP_MARKER}&p=4411&u=${encodeURIComponent(baseUrl)}`;
    }

    // 2. Generate Hotel Link (Trip.com via Travelpayouts)
    static getHotelLink(destination: string, hotelName?: string): string {
        const query = hotelName ? `${hotelName} ${destination}` : destination;
        const baseUrl = `https://www.trip.com/hotels/list?city=${encodeURIComponent(destination)}&keyword=${encodeURIComponent(hotelName || "")}`;
        // Trip.com via Travelpayouts (p=12242 is Trip.com)
        return `https://tp.media/r?marker=${TP_MARKER}&p=12242&u=${encodeURIComponent(baseUrl)}`;
    }

    // 3. Generate Activity Link (GetYourGuide via Travelpayouts)
    static getActivityLink(activityName: string, destination: string): string {
        const baseUrl = `https://www.getyourguide.com/s/?q=${encodeURIComponent(activityName + " " + destination)}`;
        // GetYourGuide via Travelpayouts (p=11488 is GetYourGuide)
        return `https://tp.media/r?marker=${TP_MARKER}&p=11488&u=${encodeURIComponent(baseUrl)}`;
    }

    // 4. Generate Transfer Link (Welcome Pickups)
    static getTransferLink(destination: string): string {
        const baseUrl = `https://www.welcomepickups.com/${encodeURIComponent(destination.toLowerCase())}/`;
        // Welcome Pickups via Travelpayouts (p=2757)
        return `https://tp.media/r?marker=${TP_MARKER}&p=2757&u=${encodeURIComponent(baseUrl)}`;
    }

    // 5. Generate Luggage Link (Radical Storage)
    static getLuggageLink(destination: string): string {
        const baseUrl = `https://radicalstorage.com/luggage-storage/${encodeURIComponent(destination.toLowerCase().replace(/\s+/g, '-'))}`;
        // Radical Storage via Travelpayouts (p=5867)
        return `https://tp.media/r?marker=${TP_MARKER}&p=5867&u=${encodeURIComponent(baseUrl)}`;
    }

    // 6. Generate Hostel Link (Hostelworld)
    static getHostelLink(destination: string): string {
        const baseUrl = `https://www.hostelworld.com/s?q=${encodeURIComponent(destination)}`;
        // Hostelworld via Travelpayouts (p=3518)
        return `https://tp.media/r?marker=${TP_MARKER}&p=3518&u=${encodeURIComponent(baseUrl)}`;
    }

    // 7. Generate TripAdvisor Link (TripAdvisor)
    static getTripAdvisorLink(query: string, category: 'Attractions' | 'Hotels' | 'Restaurants' = 'Attractions'): string {
        const baseUrl = `https://www.tripadvisor.com/Search?q=${encodeURIComponent(query)}`;
        // TripAdvisor via Travelpayouts (p=5832)
        return `https://tp.media/r?marker=${TP_MARKER}&p=5832&u=${encodeURIComponent(baseUrl)}`;
    }

    // 8. Generate Expedia Link (Expedia)
    static getExpediaLink(destination: string, hotelName?: string): string {
        const query = hotelName ? `${hotelName} ${destination}` : destination;
        const baseUrl = `https://www.expedia.com/Hotel-Search?destination=${encodeURIComponent(query)}`;
        // Expedia via Travelpayouts (p=12140)
        return `https://tp.media/r?marker=${TP_MARKER}&p=12140&u=${encodeURIComponent(baseUrl)}`;
    }

    // 4. Enrich a full TravelPlan with real links
    static enrichPlanWithLinks(plan: TravelPlan, originCity: string = "SCL"): TravelPlan {
        const isLowBudget = (plan.budget_breakdown?.accommodation || 0) < 50;

        // Enrich Flights
        if (plan.flight_fast) {
            plan.flight_fast.affiliate_link = this.getFlightLink(originCity, plan.destination_name);
            // Add Welcome Pickups as a recommendation for arrival
            plan.flight_fast.booking_note = "Te recomendamos reservar un traslado privado con Welcome Pickups.";
        }
        
        // Enrich Hotels vs Hostels vs Expedia (Premium)
        if (plan.hotels_suggestion) {
            plan.hotels_suggestion.forEach(hotel => {
                if (isLowBudget || hotel.price_category === 'budget') {
                    hotel.affiliate_link = this.getHostelLink(plan.destination_name);
                } else if (hotel.price_category === 'luxury') {
                    // Use Expedia for Premium/Luxury results
                    hotel.affiliate_link = this.getExpediaLink(plan.destination_name, hotel.name);
                } else {
                    hotel.affiliate_link = this.getHotelLink(plan.destination_name, hotel.name);
                }
            });
        }

        // Enrich Activities and Special Services
        if (plan.itinerary) {
            plan.itinerary.forEach((day, index) => {
                // Add Luggage Storage on first and last day
                if (index === 0 || index === plan.itinerary!.length - 1) {
                    const luggageLink = this.getLuggageLink(plan.destination_name);
                    day.title += " 🎒"; // Icon to hint luggage needed
                }

                day.activities.forEach(act => {
                    if (act.is_paid_activity) {
                        // Blend GetYourGuide and TripAdvisor
                        if (act.name.toLowerCase().includes('tour') || act.name.toLowerCase().includes('visit')) {
                            act.location_url = this.getActivityLink(act.name, plan.destination_name);
                        } else {
                            act.location_url = this.getTripAdvisorLink(act.name + " " + plan.destination_name);
                        }
                    }
                });
            });
        }

        return plan;
    }
}
