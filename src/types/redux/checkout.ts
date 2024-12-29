export type CheckoutState = {
  loading: boolean;
  vnpayReturn: VnPayReturn | null;
  errorMessage: string;
};

export interface VnpayParams {
  amount: number;
  bookingType: BookingType;
  guestSize: number;
  roomId: string;
  orderId: string;
  startDate: string;
  endDate: string;
}
export enum BookingStatus {
  CONFIRMED = 'CONFIRMED',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
}

export interface VnPayReturn {
  status: BookingStatus;
  bookingType: BookingType;
  amount: number;
  txnRef: string;
  responseCode: string;
  message?: string;
}

export interface ParamsReturn {
  vnp_Amount: number;
  vnp_BankCode: string;
  vnp_BankTranNo: string;
  vnp_CardType: string;
  vnp_OrderInfo: string;
  vnp_PayDate: string;
  vnp_ResponseCode: string;
  vnp_TmnCode: string;
  vnp_TransactionNo: string;
  vnp_TransactionStatus: string;
  vnp_TxnRef: string;
  vnp_SecureHash: string;
}

export enum BookingType {
  HOTELS = 'HOTELS',
  TOURS = 'TOURS',
}
