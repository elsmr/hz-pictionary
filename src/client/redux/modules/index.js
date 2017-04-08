import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { reducer as app } from './app';
import { reducer as user, fetchUserAuthEpic, logoutEpic, setUsernameEpic } from './user';
import { reducer as room, watchRoomEpic, createRoomEpic } from './room';
import { reducer as roomForm, updateRoomFormEpic } from './roomForm';
import { reducer as profileForm, updateProfileFormEpic } from './profileForm';

export const rootEpic = combineEpics(
  fetchUserAuthEpic,
  createRoomEpic,
  watchRoomEpic,
  updateRoomFormEpic,
  logoutEpic,
  updateProfileFormEpic,
  setUsernameEpic
);

export const rootReducer = combineReducers({
  app,
  user,
  room,
  roomForm,
  profileForm,
});
