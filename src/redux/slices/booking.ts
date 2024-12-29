import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { envConfig } from 'src/config';
import { dispatch } from 'src/redux/store';
import { BookingType, BookingState } from 'src/types/redux/booking';

type GetBookingsSuccessAction = PayloadAction<BookingType[] | null>;
type GetBookingSuccessAction = PayloadAction<BookingType | null>;
type GetFailureAction = PayloadAction<string>;

const initialState: BookingState = {
  loading: false,
  errorMessage: '',
  bookings: [],
  booking: null,
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    getRequest: (state: BookingState) => {
      state.loading = true;
    },
    getBookingsSuccess: (state: BookingState, action: GetBookingsSuccessAction) => {
      state.loading = false;
      state.bookings = action.payload;
    },
    getFailure: (state: BookingState, action: GetFailureAction) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    getBookingSuccess: (state: BookingState, action: GetBookingSuccessAction) => {
      state.loading = false;
      state.booking = action.payload;
    },
  },
});

export const getBookings = (page = 0, limit = 9, city = '') => {
  return async () => {
    try {
      dispatch(bookingSlice.actions.getRequest());
      const result = await axios.get(
        `${envConfig.serverURL}/bookings?page=${page}&limit=${limit}&city=${city}`
      );
      const bookings: BookingType[] = Array.isArray(result.data.data.data)
        ? result.data.data.data
        : [];

      dispatch(bookingSlice.actions.getBookingsSuccess(bookings.length > 0 ? bookings : null));
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(bookingSlice.actions.getFailure(errorMessage));
    }
  };
};

export const getHotelById = (id: string) => {
  return async () => {
    try {
      dispatch(bookingSlice.actions.getRequest());
      const result = await axios.get(`${envConfig.serverURL}/bookings/get/${id}`);
      const booking: BookingType = result.data.data;
      dispatch(bookingSlice.actions.getBookingSuccess(booking ? booking : null));
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(bookingSlice.actions.getFailure(errorMessage));
    }
  };
};

export default bookingSlice.reducer;
