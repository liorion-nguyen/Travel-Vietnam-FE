export type BookingState = {
  loading: boolean;
  errorMessage: string;
  bookings: BookingType[] | null;
  booking: BookingType | null;
};

export interface BookingType {
  _id: string;
  userId: string;
  orderId: string;
  amount: number;
  vnpayCode: string;
  status: string;
  bookingType: string;
  guestSize: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
