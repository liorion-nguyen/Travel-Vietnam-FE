export const envConfig = {
  googleAppId: import.meta.env.VITE_GOOGLE_APP_ID,
  serverURL: import.meta.env.VITE_SERVER_URL,
};

export const localStorageConfig = {
  accessToken: 'jwt-access-token',
  refreshToken: 'jwt-refresh-token',
};
