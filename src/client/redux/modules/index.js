import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { reducer as app, initAppEpic } from './app';
import { reducer as user, fetchUserAuthEpic, logoutEpic, setUsernameEpic } from './user';
import {
  reducer as room,
  watchRoomEpic,
  createRoomEpic,
  storeRoomEpic,
  watchCanvasEpic,
  startGameEpic,
  countDownEpic,
  loseRoundEpic,
  winRoundEpic,
  nextRoundEpic,
} from './room';
import { reducer as roomForm, updateRoomFormEpic } from './roomForm';
import { reducer as profileForm, updateProfileFormEpic } from './profileForm';
import { sendMessageEpic } from './chat';

export const rootEpic = combineEpics(
  fetchUserAuthEpic,
  createRoomEpic,
  watchRoomEpic,
  updateRoomFormEpic,
  logoutEpic,
  updateProfileFormEpic,
  setUsernameEpic,
  initAppEpic,
  storeRoomEpic,
  watchCanvasEpic,
  sendMessageEpic,
  startGameEpic,
  countDownEpic,
  loseRoundEpic,
  winRoundEpic,
  nextRoundEpic
);

export const rootReducer = combineReducers({
  app,
  user,
  room,
  roomForm,
  profileForm,
});
