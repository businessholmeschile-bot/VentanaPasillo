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

    // 4. Enrich a full TravelPlan with real links
    static enrichPlanWithLinks(plan: TravelPlan, originCity: string = "SCL"): TravelPlan {
        
        // Enrich Flights
        if (plan.flight_fast) {
            plan.flight_fast.affiliate_link = this.getFlightLink(originCity, plan.destination_name);
        }
        if (plan.flight_cheap) {
            plan.flight_cheap.affiliate_link = this.getFlightLink(originCity, plan.destination_name);
        }

        // Enrich Hotels
        if (plan.hotels_suggestion) {
            plan.hotels_suggestion.forEach(hotel => {
                hotel.affiliate_link = this.getHotelLink(plan.destination_name, hotel.name);
            });
        }

        // Enrich Activities
        if (plan.itinerary) {
            plan.itinerary.forEach(day => {
                day.activities.forEach(act => {
                    if (act.is_paid_activity) {
                        act.location_url = this.getActivityLink(act.name, plan.destination_name);
                    }
                });
            });
        }

        return plan;
    }
}
