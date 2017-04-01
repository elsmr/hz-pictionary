import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mapTo';
import { actionTypes } from '../actions';

const initialState = {};

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

export const roomEpic = action$ =>
  action$.ofType('PING')
    .delay(1000)
    .mapTo({ type: 'PONG' });
