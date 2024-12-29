import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { dispatch } from '../store';
import {
  AuthenticationState,
  LoginRequestType,
  LoginResponseType,
  RegisterRequestType,
} from 'src/types/redux/authentication';
import { envConfig, localStorageConfig } from 'src/config';
import toast from 'react-hot-toast';

type RegisterFailureAction = PayloadAction<string>;
type LoginFailureAction = PayloadAction<string>;
type ForgotPasswordFailureAction = PayloadAction<string>;
type ResetPasswordFailureAction = PayloadAction<string>;

const initialState: AuthenticationState = {
  loading: false,
  isAuthenticated: false,
  errorMessage: '',
  forgotEmailSent: false,
  open: '',
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    // REGISTER
    registerRequest: (state: AuthenticationState) => {
      state.loading = true;
    },
    registerSuccess: (state: AuthenticationState) => {
      state.loading = false;
    },
    registerFailure: (state: AuthenticationState, action: RegisterFailureAction) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    // LOGIN
    loginRequest: (state: AuthenticationState) => {
      state.loading = true;
    },
    loginSuccess: (state: AuthenticationState) => {
      state.loading = false;
      state.isAuthenticated = true;
    },
    loginFailure: (state: AuthenticationState, action: LoginFailureAction) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    // LOGOUT
    logout: (state: AuthenticationState) => {
      state.isAuthenticated = false;
    },
    // FORGOT PASSWORD
    forgotPasswordRequest: (state: AuthenticationState) => {
      state.forgotEmailSent = false;
      state.loading = true;
    },
    forgotPasswordSuccess: (state: AuthenticationState) => {
      state.forgotEmailSent = true;
      state.loading = false;
    },
    forgotPasswordFailure: (state: AuthenticationState, action: ForgotPasswordFailureAction) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    // RESET PASSWORD
    resetPasswordRequest: (state: AuthenticationState) => {
      state.loading = true;
    },
    resetPasswordSuccess: (state: AuthenticationState) => {
      state.loading = false;
    },
    resetPasswordFailure: (state: AuthenticationState, action: ResetPasswordFailureAction) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    setDiaLog: (state: AuthenticationState, action: PayloadAction<string>) => {
      state.open = action.payload;
    },
  },
});

export const register = (registerData: RegisterRequestType) => {
  return async () => {
    try {
      dispatch(authenticationSlice.actions.registerRequest());
      await axios.post(`${envConfig.serverURL}/auth/register`, registerData);
      dispatch(authenticationSlice.actions.registerSuccess());
      toast.success('Registration saved! Please check your email for confirmation.');
    } catch (error) {
      const errorMessage: string = error.response
        ? error.response.data.message
        : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(authenticationSlice.actions.registerFailure(errorMessage));
    }
  };
};

export const login = (loginData: LoginRequestType) => {
  return async () => {
    try {
      dispatch(authenticationSlice.actions.loginRequest());
      const result = await axios.post(`${envConfig.serverURL}/auth/login`, loginData);
      const data: LoginResponseType = result.data ? result.data.data : null;

      if (data) {
        localStorage.setItem(localStorageConfig.accessToken, data.access_token);
        localStorage.setItem(localStorageConfig.refreshToken, data?.refresh_token || '');
      }

      dispatch(authenticationSlice.actions.loginSuccess());
    } catch (error) {
      const errorMessage: string = error.response
        ? error.response.data.message
        : 'Something went wrong';
      toast.error('Invalid email or password');
      dispatch(authenticationSlice.actions.loginFailure(errorMessage));
    }
  };
};

export const logout = () => {
  return async () => {
    dispatch(authenticationSlice.actions.logout());

    await axios.post(`${envConfig.serverURL}/auth/logout`, {
      refresh_token: localStorage.getItem(localStorageConfig.refreshToken),
    });
    localStorage.removeItem(localStorageConfig.accessToken);
    localStorage.removeItem(localStorageConfig.refreshToken);
  };
};

export const forgotPassword = (email: string) => {
  return async () => {
    try {
      dispatch(authenticationSlice.actions.forgotPasswordRequest());
      await axios.post(`${envConfig.serverURL}/auth/forgot-password`, { email });
      dispatch(authenticationSlice.actions.forgotPasswordSuccess());
      toast.success('Code has been sent to your email');
    } catch (error) {
      const errorMessage: string = error.response
        ? error.response.data.message
        : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(authenticationSlice.actions.forgotPasswordFailure(errorMessage));
    }
  };
};

export const verifyCode = (verifyCodeRequest: { email: string, code: string }) => {
  return async () => {
    try {
      dispatch(authenticationSlice.actions.forgotPasswordRequest());
      await axios.post(`${envConfig.serverURL}/auth/verify-code`, verifyCodeRequest);
      dispatch(authenticationSlice.actions.forgotPasswordSuccess());
      toast.success('New password has been sent to your email');
      dispatch(authenticationSlice.actions.setDiaLog('login'));
    } catch (error) {
      const errorMessage: string = error.response
        ? error.response.data.message
        : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(authenticationSlice.actions.forgotPasswordFailure(errorMessage));
    }
  };
};

export const resetPassword = (key: string, newPassword: string) => {
  return async () => {
    try {
      dispatch(authenticationSlice.actions.resetPasswordRequest());
      await axios.post(`/auth/reset/reset-password/${key}`, {
        password: newPassword,
      });
      dispatch(authenticationSlice.actions.resetPasswordSuccess());
      toast.success('Your password has been successfully updated!');
    } catch (error) {
      const errorMessage: string = error.response
        ? error.response.data.message
        : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(authenticationSlice.actions.resetPasswordFailure(errorMessage));
    }
  };
};

export const handleOpenDialog = (value: string) => {
  return async () => {
    dispatch(authenticationSlice.actions.setDiaLog(value));
  };
};

export default authenticationSlice.reducer;
