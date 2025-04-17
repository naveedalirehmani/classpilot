export const API_ROUTES = {
  AUTH: {
    SIGN_UP: `/auth/signup`,
    SIGN_IN: `/auth/signin`,
    SIGN_OUT: `/auth/signout`,
    CURRENT_USER: `/auth/me`,
    GOOGLE_AUTH: `/auth/google`,
  },
  USERS: {
    BY_ID: (id: string) => `/users/${id}`,
    UPDATE_USER: `/users/update-user`,
    GET_USER: `/users/me`,
  },
};