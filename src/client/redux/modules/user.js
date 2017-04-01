import { actionTypes } from '../actions';

const initialState = { isAuthorized: false, details: {} };

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.toggleTodo:
      return [
        ...state,
        action.todo,
      ];
    default:
      return state;
  }
};

export const userEpic = action$ =>
  action$.ofType('PING')
    .delay(1000)
    .mapTo({ type: 'PONG' });
