export const API_ROUTES = {
  AUTH: {
    SIGN_UP: `/auth/signup`,
    SIGN_IN: `/auth/signin`,
    SIGN_OUT: `/auth/logout`,
    CURRENT_USER: `/auth/me`,
    GOOGLE_AUTH: `/auth/google`,
  },
  USER: {
    BY_ID: (id: string) => `/user/${id}`,
    UPDATE_USER: `/user/update-user-details`,
    GET_USER: `/user/me`,
    TOGGLE_FIRST_TIME_LOGIN: `/user/toggle-first-time-login`,
    GET_CURRENT_USER: `/user/current-user`,
  },
  LESSON_PLAN: {
    CREATE_LESSON_PLAN: `/lesson-plan/create`,
    GET_LESSON_PLAN: (id: string) => `/lesson-plan/${id}`,
    GET_ALL_USER_LESSON_PLANS: `/lesson-plan/all-user-lesson-plans`,
    GET_ALL_FAVORITES: `/lesson-plan/favorites`,
    ADD_FAVORITE: (id: string) => `/lesson-plan/add-favorite/${id}`,
    REMOVE_FAVORITE: (id: string) => `/lesson-plan/remove-favorite/${id}`,
    UPDATE_LESSON_PLAN: (id: string) => `/lesson-plan/update/${id}`,
  },
};