import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { reducer as user, fetchUserAuthEpic, logoutEpic } from './user';
import { reducer as room, watchRoomEpic, createRoomEpic } from './room';
import { reducer as roomForm, updateRoomFormEpic } from './roomForm';

export const rootEpic = combineEpics(
  fetchUserAuthEpic,
  createRoomEpic,
  watchRoomEpic,
  updateRoomFormEpic,
  logoutEpic
);

export const rootReducer = combineReducers({
  user,
  room,
  roomForm,
});
