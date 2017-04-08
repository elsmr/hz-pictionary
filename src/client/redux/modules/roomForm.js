import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/catch';
import {
  actionTypes,
  fetchRoomNameValidity,
  fetchRoomNameValidityFulfilled,
  fetchRoomNameValidityRejected,
} from '../actions';
import { FORM_STATES, USER_TYPING_DEBOUNCE } from '../../constants';
import { hzRooms } from '../../lib/horizon';

const initialState = {
  formState: FORM_STATES.LOCKED,
  name: '',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.setRoomFormName:
      return Object.assign({}, state, { name: action.name });
    case actionTypes.setRoomFormState:
      return Object.assign({}, state, { formState: action.state });
    case actionTypes.fetchRoomNameValidity:
      return Object.assign({}, state, { formState: FORM_STATES.LOADING });
    case actionTypes.fetchRoomNameValidityFullfilled:
      return Object.assign({}, state, {
        formState: action.isValid ? FORM_STATES.VALID : FORM_STATES.INVALID,
      });
    case actionTypes.fetchRoomNameValidityRejected:
      return Object.assign({}, state, { formState: FORM_STATES.INVALID });
    case actionTypes.clearRoomForm:
      return initialState;
    default:
      return state;
  }
};

export const updateRoomFormEpic = action$ =>
  action$.ofType(actionTypes.setRoomFormName)
    .debounceTime(USER_TYPING_DEBOUNCE)
    .mergeMap(action =>
      Observable.merge(
        Observable.of(fetchRoomNameValidity()),
        hzRooms.find({ name: action.name })
          .fetch()
          .defaultIfEmpty()
          .map(room => fetchRoomNameValidityFulfilled(!room))
          .catch(err => Observable.of(fetchRoomNameValidityRejected(err)))
      )
    );
