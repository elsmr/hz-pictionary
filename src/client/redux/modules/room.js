import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/defaultIfEmpty';
import { push } from 'connected-react-router';
import { hzRooms } from '../../lib/horizon';
import { actionTypes, updateRoom } from '../actions';

const initialState = {
  loading: true,
  room: {
    id: '',
    name: '',
    canvas: {},
    config: {},
    participants: [],
    creatorId: '',
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.updateRoom:
      return Object.assign({}, state, { room: action.room, loading: false });
    default:
      return state;
  }
};

export const createRoomEpic = action$ =>
  action$.ofType(actionTypes.createRoom)
    .do(action => hzRooms.store(Object.assign(initialState, { name: action.name })))
    .map(action => push(`/${action.name}`));

export const watchRoomEpic = action$ =>
  action$.ofType(actionTypes.startWatchingRoom)
    .mergeMap(action =>
      Observable.merge( // Observables from horizon don't have all operators => merge with empty
        hzRooms.find({ name: action.name }).watch(),
        Observable.empty()
      )
        .defaultIfEmpty()
        .map(room => (room ? updateRoom(room) : push('/')))
        .takeUntil(action$.ofType(actionTypes.stopWatchingRoom))
    );
