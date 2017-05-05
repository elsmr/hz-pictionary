import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/observable/fromEvent';
import { push } from 'connected-react-router';
import { hzRooms } from '../../lib/horizon';
import {
  actionTypes,
  updateRoom,
  clearRoomForm,
  updateRoomNotCanvas,
  updateCanvas,
  storeCanvas,
  // clearCanvas,
} from '../actions';
import { mouseEventStream } from '../../lib/canvas';
import { STORE_CHANGES_DEBOUNCE } from '../../constants';

const initialState = {
  loading: true,
  started: false,
  id: '',
  name: '',
  canvas: {
    data: [],
  },
  config: {
    maxPlayers: 4,
    winningScore: 3,
  },
  participants: [],
  creator: {},
  chat: [
    {
      sender: 'Game',
      message: 'Welcome to the pictionary chat, make a guess!',
      date: new Date(),
    },
  ],
  game: {
    drawingPlayer: {
      id: '',
      index: 0,
    },
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.updateRoom:
      return Object.assign({}, state, { ...action.room, loading: false });
    case actionTypes.updateRoomNotCanvas:
      return Object.assign({}, state, { ...action.room, loading: false, canvas: state.canvas });
    case actionTypes.updateCanvas:
      return Object.assign({}, state, { canvas: { data: [...state.canvas.data, action.data] } });
    case actionTypes.clearCanvas:
      return Object.assign({}, state, { canvas: { data: [] } });
    default:
      return state;
  }
};

export const createRoomEpic = action$ =>
  action$.ofType(actionTypes.createRoom)
    .do(action =>
      hzRooms.store(
        Object.assign(initialState, {
          name: action.name,
          creator: action.user,
        })
      ))
    .mergeMap(action =>
      Observable.concat(
        Observable.of(clearRoomForm()),
        Observable.of(push(`/rooms/${action.name}`))
      )
    );

export const watchRoomEpic = (action$, store) =>
  action$.ofType(actionTypes.startWatchingRoom)
    .mergeMap(action =>
      Observable.merge( // Observables from horizon don't have all operators => merge with empty
        hzRooms.find({ name: action.name }).watch(),
        Observable.empty()
      )
        .defaultIfEmpty()
        .map((room) => {
          if (!room) {
            return push('/');
          } else if (room.canvas) {
            const { user, room } = store.getState();
            if (user.id === room.game.drawingPlayer.id) {
              return updateRoomNotCanvas(room);
            }
          }
          return updateRoom(room);
        })
        .takeUntil(action$.ofType(actionTypes.stopWatchingRoom))
    );

export const watchCanvasEpic = action$ =>
  action$.ofType(actionTypes.startWatchingCanvas)
    .mergeMap(action =>
      mouseEventStream(action.canvas)
        .map(line => updateCanvas(line))
        .takeUntil(action$.ofType(actionTypes.stopWatchingCanvas))
    );

export const storeCanvasEpic = (action$, store) =>
  action$.ofType(actionTypes.updateCanvas)
    .debounceTime(STORE_CHANGES_DEBOUNCE)
    .mapTo(storeCanvas(store.getState().room.canvas.data));
