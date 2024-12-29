export type RolesState = {
  loading: boolean;
  roles: RolesType[] | null;
  errorMessage: string | null;
  roleLength: number | undefined,
  page: number,
  size: number,
};

export type RolesType = {
  _id?: string,
  name: string,
  permissions: string[],
};

