export type FlightsState = {
  loading: boolean;
  errorMessage: string;
  locations: LocationsType[] | null;
  flights: FlightType[] | null;
};

export type LocationsType = {
  id: string;
  name: string;
  description: string;
  image_url: string;
};

export interface FlightType {
  id: number;
  airline: string;
  departureLocation: string;
  arrivalLocation: string;
  departureTime: string;
  duration: string;
  price: number;
  destinationId: number;
}
