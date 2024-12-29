import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { BankType, PaymentsState } from 'src/types/redux/payment';
type BanksAction = PayloadAction<BankType[]>;
type FailureAction = PayloadAction<string>;

const initialState: PaymentsState = {
  loading: false,
  errorMessage: '',
  banks: null,
};

export const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    // REGISTER
    banksRequest: (state: PaymentsState) => {
      state.loading = true;
    },
    banksSuccess: (state: PaymentsState, action: BanksAction) => {
      state.loading = false;
      state.banks = action.payload;
    },
    banksFailure: (state: PaymentsState, action: FailureAction) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
  },
});

export default paymentsSlice.reducer;
