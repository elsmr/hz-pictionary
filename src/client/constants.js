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

export const TOAST_STATES = {
  SUCCESS: 'ok',
  WARNING: 'warning',
  ERROR: 'critical',
  DEFAULT: 'unknown',
};

export const COLLECTIONS = {
  ROOMS: 'rooms',
  USERS: 'users',
};

export const AUTH_PROVIDERS = {
  GITHUB: 'github',
  GOOGLE: 'google',
};

export const USER_TYPING_DEBOUNCE = 250;
export const STORE_CHANGES_THROTTLE = 1000;

export const PLAYER_COLORS = [
  '#ff324d',
  '#ffd602',
  '#8cc800',
  '#00cceb',
  '#ff7d28',
  '#dc2878',
];
