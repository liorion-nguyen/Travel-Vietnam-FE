export type PaymentsState = {
  loading: boolean;
  errorMessage: string;
  banks: BankType[] | null;
};

export type BankType = {
  id: number;
  name: string;
  code: string;
  bin: string;
  shortName: string;
  logo: string;
  transferSupported: number;
  lookupSupported: number;
};
