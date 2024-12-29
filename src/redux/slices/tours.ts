import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { dispatch } from '../store';
import toast from 'react-hot-toast';
import { ToursState, TourType } from 'src/types/redux/tours';
import { envConfig } from 'src/config';

type GetFailureAction = PayloadAction<string>;
type GetToursSuccessAction = PayloadAction<TourType[] | null>;
type GetTourSuccessAction = PayloadAction<TourType | null>;

const initialState: ToursState = {
  loading: false,
  tours: null,
  tour: null,
  errorMessage: '',
};

export const toursSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {
    getRequest: (state: ToursState) => {
      state.loading = true;
    },
    getFailure: (state: ToursState, action: GetFailureAction) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    getToursSuccess: (state: ToursState, action: GetToursSuccessAction) => {
      state.loading = false;
      state.tours = action.payload;
    },
    getTourSuccess: (state: ToursState, action: GetTourSuccessAction) => {
      state.loading = false;
      state.tour = action.payload;
    },
    createReviewSuccess: (state: ToursState) => {
      state.loading = false;
    },
  },
});

export const getTours = (page = 0, limit = 9, name = '', destination = '', departurePoint = '') => {
  return async () => {
    try {
      dispatch(toursSlice.actions.getRequest());
      const result = await axios.get(
        `${envConfig.serverURL}/tours/search?page=${page}&limit=${limit}&name=${name}&departurePoint=${departurePoint}&destination=${destination}`
      );
      const tours: TourType[] = Array.isArray(result.data.data.data) ? result.data.data.data : [];
      dispatch(toursSlice.actions.getToursSuccess(tours.length > 0 ? tours : null));
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(toursSlice.actions.getFailure(errorMessage));
    }
  };
};

export const getTourById = (id: string) => {
  return async () => {
    try {
      dispatch(toursSlice.actions.getRequest());
      const result = await axios.get(`${envConfig.serverURL}/tours/get/${id}`);
      const tour: TourType = result.data.data;
      dispatch(toursSlice.actions.getTourSuccess(tour ? tour : null));
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(toursSlice.actions.getFailure(errorMessage));
    }
  };
};

export const createReviewTour = (review: string, rating: number, id: string) => {
  return async () => {
    try {
      dispatch(toursSlice.actions.getRequest());
      await axios.post(`${envConfig.serverURL}/reviews/${id}/tour`, {
        reviewText: review,
        rating: rating,
      });
      dispatch(toursSlice.actions.createReviewSuccess());
      toast.success('Review created successfully');
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(toursSlice.actions.getFailure(errorMessage));
    }
  };
};

export default toursSlice.reducer;
