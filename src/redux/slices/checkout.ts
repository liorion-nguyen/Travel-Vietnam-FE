import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { dispatch } from 'src/redux/store';
import { CheckoutState, ParamsReturn, VnPayReturn, VnpayParams } from 'src/types/redux/checkout';

type FailureAction = PayloadAction<string>;
type VnpayReturnAction = PayloadAction<VnPayReturn>;

const initialState: CheckoutState = {
  loading: false,
  vnpayReturn: null,
  errorMessage: '',
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    checkoutRequest: (state: CheckoutState) => {
      state.loading = true;
    },
    checkoutSuccess: (state: CheckoutState) => {
      state.loading = false;
    },
    checkoutFailure: (state: CheckoutState, action: FailureAction) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    checkoutReturnRequest: (state: CheckoutState) => {
      state.loading = true;
    },
    checkoutReturnSuccess: (state: CheckoutState, action: VnpayReturnAction) => {
      state.loading = false;
      state.vnpayReturn = action.payload;
    },
    checkoutReturnFailure: (state: CheckoutState, action: FailureAction) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
  },
});

export const getPaymentUrl = (params: VnpayParams) => {
  return async () => {
    try {
      dispatch(checkoutSlice.actions.checkoutRequest());
      const response = await axios.post('/vnpay/create_payment_url', params);

      window.location.href = response.data.data.paymentUrl;
      dispatch(checkoutSlice.actions.checkoutSuccess());
    } catch (error) {
      dispatch(checkoutSlice.actions.checkoutFailure(error.message));
    }
  };
};

export const paymentReturn = (params: ParamsReturn) => {
  return async () => {
    try {
      dispatch(checkoutSlice.actions.checkoutReturnRequest());
      const response = await axios.get('/vnpay/vnpay_return', { params });

      dispatch(checkoutSlice.actions.checkoutReturnSuccess(response.data.data));
    } catch (error) {
      dispatch(checkoutSlice.actions.checkoutReturnFailure(error.message));
    }
  };
};

export default checkoutSlice.reducer;
