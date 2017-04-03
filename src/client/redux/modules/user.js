import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/ignoreElements';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mergeMapTo';
import Horizon from '@horizon/client';
import {
  actionTypes,
  fetchUserAuthFulfilled,
  fetchUserAuthRejected,
  setRoomFormState,
} from '../actions';
import { hz } from '../../lib/horizon';
import { FORM_STATES } from '../../constants';

const initialState = {
  authPending: true,
  isAuthorized: false,
  details: {},
  error: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.logout:
      return Object.assign({}, state, {
        details: {},
        isAuthorized: false,
        authPending: false,
      });
    case actionTypes.fetchUserAuthFulfilled:
      return Object.assign({}, state, {
        details: { username: action.user.id.substring(0, 6), ...action.user },
        isAuthorized: true,
        authPending: false,
      });
    case actionTypes.fetchUserAuthRejected:
      return Object.assign({}, state, {
        error: action.error,
        isAuthorized: false,
        authPending: false,
      });
    default:
      return state;
  }
};

export const fetchUserAuthEpic = action$ =>
  action$.ofType(actionTypes.fetchUserAuth)
    .mergeMapTo(
      hz.hasAuthToken() ? (
        hz.currentUser()
          .fetch()
          .mergeMap(user =>
            Observable.concat(
              Observable.of(fetchUserAuthFulfilled(user)),
              Observable.of(setRoomFormState(FORM_STATES.PRISTINE))
            )
          )
      ) : (
        Observable.of(fetchUserAuthRejected('No user logged in'))
      )
    );

export const logoutEpic = action$ =>
  action$.ofType(actionTypes.logout)
    .do(() => Horizon.clearAuthTokens())
    .mapTo(setRoomFormState(FORM_STATES.LOCKED));
