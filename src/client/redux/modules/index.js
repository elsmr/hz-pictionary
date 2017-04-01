import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { reducer as user, userEpic } from './user';
import { reducer as room, roomEpic } from './room';

export const rootEpic = combineEpics(userEpic, roomEpic);

export const rootReducer = combineReducers({
  user,
  room,
});
