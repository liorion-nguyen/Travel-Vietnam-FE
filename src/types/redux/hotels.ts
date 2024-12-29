import { Address, Review } from './tours';

export type HotelsState = {
  loading: boolean;
  errorMessage: string;
  locations: LocationsType[] | null;
  hotels: HotelType[] | null;
  hotel: HotelType | null;
  rooms: RoomType[] | null;
};

export type LocationsType = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  latitude?: number;
  longitude?: number;
};

export interface HotelType {
  _id: string;
  name: string;
  address: Address;
  description: string;
  photos: string[];
  reviews: Review[];
  price: number;
}

export interface RoomType {
  _id: string;
  hotelId: string;
  images: string[];
  roomNumber: number;
  roomType: string;
  name: string;
  price: number;
  description: string;
  availability: boolean;
  maxOccupancy: number;
}
