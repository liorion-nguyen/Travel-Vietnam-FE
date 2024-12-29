export type PermissionsState = {
  loading: boolean;
  permissions: PermissionsType[] | null;
  errorMessage: string | null;
  permissionLength: number | undefined,
  page: number,
  size: number,
};

export type PermissionsType = {
  _id?: string,
  scope: string,
  actions: ActionsType,
};

export type ActionsType = {
  name: string,
  description: string,
};
