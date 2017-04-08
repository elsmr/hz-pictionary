import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mergeMapTo';
import Horizon from '@horizon/client';
import { push } from 'connected-react-router';
import {
  actionTypes,
  fetchUserAuthFulfilled,
  fetchUserAuthRejected,
  setRoomFormState,
  showToast,
  clearProfileForm,
} from '../actions';
import { hz, hzUsers } from '../../lib/horizon';
import { FORM_STATES, TOAST_STATES } from '../../constants';

const initialState = {
  authPending: true,
  isAuthorized: false,
  id: '',
  name: '',
  error: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.logout:
      return Object.assign({}, initialState, { authPending: false });
    case actionTypes.fetchUserAuthFulfilled:
      return Object.assign({}, state, {
        ...action.user,
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
          .watch()
          .mergeMap((user) => {
            if (!user.name) {
              hzUsers.update(Object.assign({}, user, { name: user.id.substring(0, 6) }));
            }

            return Observable.concat(
              Observable.of(fetchUserAuthFulfilled(user)),
              Observable.of(setRoomFormState(FORM_STATES.PRISTINE))
            );
          })
      ) : (
        Observable.of(fetchUserAuthRejected('No user logged in'))
      )
    );

export const setUsernameEpic = action$ =>
  action$.ofType(actionTypes.setUsername)
    .mergeMap(action =>
      hz.currentUser()
        .fetch()
        .do(user => hzUsers.update({ id: user.id, name: action.name }))
        .mergeMap(() =>
          Observable.concat(
            Observable.of(showToast(TOAST_STATES.SUCCESS, 'Username successfully updated')),
            Observable.of(clearProfileForm()),
            Observable.of(push('/'))
          )
        )
        .catch(() => showToast(TOAST_STATES.ERROR, 'Username update failed, please try again'))
    );

export const logoutEpic = action$ =>
  action$.ofType(actionTypes.logout)
    .do(() => Horizon.clearAuthTokens())
    .mapTo(setRoomFormState(FORM_STATES.LOCKED));
