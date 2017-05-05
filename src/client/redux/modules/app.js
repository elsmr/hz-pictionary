import 'rxjs/add/operator/mapTo';
import { actionTypes, fetchUserAuth } from '../actions';

const initialState = {
  toast: null,
  dimensions: {
    width: null,
    height: null,
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.showToast:
      return Object.assign({}, state, {
        toast: {
          type: action.status,
          message: action.message,
        },
      });
    case actionTypes.destroyToast:
      return Object.assign({}, state, { toast: null });
    case actionTypes.initializeApp:
      return Object.assign({}, state, {
        dimensions: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      });
    default:
      return state;
  }
};

export const initAppEpic = action$ =>
  action$.ofType(actionTypes.initializeApp)
    .mapTo(fetchUserAuth());
