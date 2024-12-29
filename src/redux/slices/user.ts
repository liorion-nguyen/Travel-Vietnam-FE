import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { dispatch } from '../store';
import { UserState, UserType } from 'src/types/redux/user';
import { Response } from 'src/types/redux/response';
import toast from 'react-hot-toast';
import { envConfig } from 'src/config';

type GetUserSuccessdAction = PayloadAction<UserType | null>;
type GetUserFailureAction = PayloadAction<string>;

const initialState: UserState = {
  loading: false,
  user: null,
  errorMessage: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserRequest: (state: UserState) => {
      state.loading = true;
    },
    getUserSuccess: (state: UserState, action: GetUserSuccessdAction) => {
      state.loading = false;
      state.user = action.payload;
    },
    getUserFailure: (state: UserState, action: GetUserFailureAction) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    updatePasswordSuccess: (state: UserState) => {
      state.loading = false;
    },
    updateUserSuccess: (state: UserState, action: GetUserSuccessdAction) => {
      state.loading = false;
      state.user = action.payload;
    }
  },
});

export const getUser = () => {
  return async () => {
    try {
      dispatch(userSlice.actions.getUserRequest());
      const result: AxiosResponse<Response<UserType>> = await axios.get(`${envConfig.serverURL}/users`);
      dispatch(userSlice.actions.getUserSuccess(result.data.data ? result.data.data : null));
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(userSlice.actions.getUserFailure(errorMessage));
    }
  };
};

export const updatePassword = (id: string, oldPassword: string, newPassword: string) => {
  return async () => {
    try {
      dispatch(userSlice.actions.getUserRequest());
      await axios.post(`${envConfig.serverURL}/users/change-password`, { oldPassword, newPassword });
      toast.success('Update password success!');
      dispatch(userSlice.actions.updatePasswordSuccess());
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(userSlice.actions.getUserFailure(errorMessage));
    }
  }
}

export const updateUser = (id: string, user: UserType) => {
  return async () => {
    try {
      toast.loading('Updating user...');
      dispatch(userSlice.actions.getUserRequest());
      const result: AxiosResponse<Response<UserType>> = await axios.put(`${envConfig.serverURL}/users/${id}`, user);
      dispatch(userSlice.actions.updateUserSuccess(result.data.data ? result.data.data : null));
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(userSlice.actions.getUserFailure(errorMessage));
    }
  }
}

export default userSlice.reducer;
