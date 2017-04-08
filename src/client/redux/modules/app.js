import { actionTypes } from '../actions';

const initialState = {
  toast: null,
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
    default:
      return state;
  }
};

export const x = 2;
