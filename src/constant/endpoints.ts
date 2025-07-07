const BASE_URL_API = import.meta.env.VITE_BASE_URL;

export const POST_API = {
  SEND_MESSAGE: `${BASE_URL_API}/chat/message`,
  GET_HISTORY: `${BASE_URL_API}/chat/history`,
};

export const AUTH_API = {
  LOGIN: `${BASE_URL_API}/auth/login`,
};
