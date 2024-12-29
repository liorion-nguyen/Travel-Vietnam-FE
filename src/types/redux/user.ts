export type UserState = {
  loading: boolean;
  user: UserType | null;
  errorMessage: string | null;
};

export type UserType = {
  authorities: string[];
  avatar: string | null;
  createdDate: string;
  email: string;
  fullName: string;
  _id: string;
  nationality: string | null;
  dateOfBirth: string | null;
  updatedDate: string;
  phone: {
    country: string;
    number: string;
  };
  address: {
    province: string;
    district: string;
    ward: string;
  };
};
