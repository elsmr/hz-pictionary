export const API_BASE = 'localhost:8181';
export const PROTOCOL = 'https';

export const ROUTES = {
  LOGIN: '/login',
  HOME: '/',
  ROOM: '/:roomId',
};

export const FORM_STATES = {
  PRISTINE: 0,
  LOADING: 1,
  VALID: 2,
  INVALID: 3,
  LOCKED: 4,
};

export const COLLECTIONS = {
  ROOMS: 'rooms',
};

export const AUTH_PROVIDERS = {
  GITHUB: 'github',
  GOOGLE: 'google',
};

export const USER_TYPING_DEBOUNCE = 250;
