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
  fetchUsernameValidity,
  fetchUsernameValidityFulfilled,
  fetchUsernameValidityRejected,
} from '../actions';
import { FORM_STATES, USER_TYPING_DEBOUNCE } from '../../constants';
import { hzUsers } from '../../lib/horizon';

const initialState = {
  formState: FORM_STATES.PRISTINE,
  username: '',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.setProfileFormUsername:
      return Object.assign({}, state, { username: action.name });
    case actionTypes.setProfileFormState:
      return Object.assign({}, state, { formState: action.state });
    case actionTypes.fetchUsernameValidity:
      return Object.assign({}, state, { formState: FORM_STATES.LOADING });
    case actionTypes.fetchUsernameValidityFullfilled:
      return Object.assign({}, state, {
        formState: action.isValid ? FORM_STATES.VALID : FORM_STATES.INVALID,
      });
    case actionTypes.fetchUsernameValidityRejected:
      return Object.assign({}, state, { formState: FORM_STATES.INVALID });
    case actionTypes.clearProfileForm:
      return initialState;
    default:
      return state;
  }
};

export const updateProfileFormEpic = action$ =>
  action$.ofType(actionTypes.setProfileFormUsername)
    .debounceTime(USER_TYPING_DEBOUNCE)
    .mergeMap(action =>
      Observable.merge(
        Observable.of(fetchUsernameValidity()),
        hzUsers.find({ name: action.name })
          .fetch()
          .defaultIfEmpty()
          .map(user => fetchUsernameValidityFulfilled(!user))
          .catch(err => Observable.of(fetchUsernameValidityRejected(err)))
      )
    );
