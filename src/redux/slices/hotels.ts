import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { envConfig } from 'src/config';
import { dispatch } from 'src/redux/store';
import { HotelType, HotelsState, RoomType } from 'src/types/redux/hotels';

type GetHotelsSuccessAction = PayloadAction<HotelType[] | null>;
type GetHotelSuccessAction = PayloadAction<{ hotel: HotelType; rooms: RoomType[] }>;
type GetRoomsSuccessAction = PayloadAction<RoomType[] | null>;
type GetFailureAction = PayloadAction<string>;

const initialState: HotelsState = {
  loading: false,
  errorMessage: '',
  locations: null,
  hotels: null,
  hotel: null,
  rooms: null,
};

export const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    getRequest: (state: HotelsState) => {
      state.loading = true;
    },
    getToursSuccess: (state: HotelsState, action: GetHotelsSuccessAction) => {
      state.loading = false;
      state.hotels = action.payload;
    },
    getFailure: (state: HotelsState, action: GetFailureAction) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    getHotelSuccess: (state: HotelsState, action: GetHotelSuccessAction) => {
      state.loading = false;
      state.hotel = action.payload.hotel;
    },
    getRoomsSuccess: (state: HotelsState, action: GetRoomsSuccessAction) => {
      state.loading = false;
      state.rooms = action.payload;
    },
    createReviewSuccess: (state: HotelsState) => {
      state.loading = false;
    },
  },
});

export const getHotels = (page = 0, limit = 9, name = '', city = '') => {
  return async () => {
    try {
      dispatch(hotelsSlice.actions.getRequest());
      const result = await axios.get(
        `${envConfig.serverURL}/hotels/search?page=${page}&limit=${limit}&name=${name}&city=${city}`
      );
      const tours: HotelType[] = Array.isArray(result.data.data.data) ? result.data.data.data : [];
      dispatch(hotelsSlice.actions.getToursSuccess(tours.length > 0 ? tours : null));
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(hotelsSlice.actions.getFailure(errorMessage));
    }
  };
};

export const getRooms = (hotelId: string, startDate: string, endDate: string) => {
  return async () => {
    try {
      dispatch(hotelsSlice.actions.getRequest());
      const result = await axios.get(
        `${envConfig.serverURL}/rooms?hotelId=${hotelId}&startDate=${startDate}&endDate=${endDate}`
      );
      const rooms: RoomType[] = Array.isArray(result.data.data) ? result.data.data : [];
      dispatch(hotelsSlice.actions.getRoomsSuccess(rooms));
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(hotelsSlice.actions.getFailure(errorMessage));
    }
  };
};

export const getHotelById = (id: string) => {
  return async () => {
    try {
      dispatch(hotelsSlice.actions.getRequest());
      const result = await axios.get(`${envConfig.serverURL}/hotels/${id}`);
      const hotel: { hotel: HotelType; rooms: [] } = result.data.data;
      dispatch(hotelsSlice.actions.getHotelSuccess(hotel));
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(hotelsSlice.actions.getFailure(errorMessage));
    }
  };
};

export const createReviewHotel = (review: string, rating: number, id: string) => {
  return async () => {
    try {
      dispatch(hotelsSlice.actions.getRequest());
      await axios.post(`${envConfig.serverURL}/reviews/${id}/hotel`, {
        reviewText: review,
        rating: rating,
      });
      dispatch(hotelsSlice.actions.createReviewSuccess());
      toast.success('Review created successfully');
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(hotelsSlice.actions.getFailure(errorMessage));
    }
  };
};
export default hotelsSlice.reducer;
