import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/sampleTime';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { push } from 'connected-react-router';
import { hzRooms } from '../../lib/horizon';
import {
  actionTypes,
  updateRoom,
  updateRoomNotCanvas,
  updateCanvas,
  noOp,
  showToast,
  receiveWord,
  pauseGame,
  // clearCanvas,
} from '../actions';
import { mouseEventStream } from '../../lib/canvas';
import { getRandomWord } from '../../lib/api';
import { PLAYER_COLORS } from '../../constants';

const initialState = {
  loading: true,
  started: false,
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
      timestamp: Date.now(),
    },
  ],
  game: {
    currentWord: null,
    winner: {
      id: null,
    },
    drawingPlayer: {
      id: null,
      index: 0,
      name: null,
    },
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.clearRoom:
      return initialState;
    case actionTypes.updateRoom:
      return Object.assign({}, state, action.room, { loading: false });
    case actionTypes.updateRoomNotCanvas:
      return Object.assign({}, state, action.room, { loading: false, canvas: state.canvas });
    case actionTypes.updateCanvas:
      return Object.assign({}, state, { canvas: { data: [...state.canvas.data, action.data] } });
    case actionTypes.clearCanvas:
      return Object.assign({}, state, { canvas: { data: [] } });
    case actionTypes.addParticipant:
      return Object.assign({}, state, {
        participants: [...state.participants, { ...action.user, score: 0 }],
      });
    case actionTypes.startGame:
      return Object.assign({}, state, { started: true });
    case actionTypes.pauseGame:
      return Object.assign({}, state, { started: false });
    case actionTypes.receiveWord:
      return Object.assign({}, state, { game: { currentWord: action.word } });
    default:
      return state;
  }
};

export const createRoomEpic = action$ =>
  action$.ofType(actionTypes.createRoom)
    .do(action =>
      hzRooms.insert(
        Object.assign(initialState, {
          name: action.name,
          creator: action.user,
          game: {
            ...initialState.game,
            drawingPlayer: action.user,
          },
          participants: [
            Object.assign({}, action.user, { color: PLAYER_COLORS[0], score: 0 }),
          ],
        })
      ))
    .mergeMap(action => Observable.of(push(`/rooms/${action.name}`)));

export const watchRoomEpic = (action$, store) =>
  action$.ofType(actionTypes.startWatchingRoom)
    .mergeMap(action =>
      Observable.merge( // Observables from horizon don't have all operators => merge with empty
        hzRooms.find({ name: action.name }).watch(),
        Observable.empty()
      )
        .defaultIfEmpty()
        .distinctUntilChanged()
        .map((room) => {
          if (!room) {
            return push('/');
          } else if (room.canvas) {
            const { user, room: stateRoom } = store.getState();
            if (user.id === room.game.drawingPlayer.id && stateRoom.canvas.data.length > 0) {
              return updateRoomNotCanvas(room);
            }
          }
          return updateRoom(room);
        })
        .takeUntil(action$.ofType(actionTypes.stopWatchingRoom))
    );

export const startGameEpic = action$ =>
  action$.ofType(actionTypes.startGame)
    .mergeMap(() => getRandomWord()
        .map(res => receiveWord(res.word))
        .catch(() =>
          Observable.concat(
            Observable.of(showToast('critical', 'Cannot start the game. Please check you connection and try again.')),
            Observable.of(pauseGame())
          )
        )
    );

export const watchCanvasEpic = action$ =>
  action$.ofType(actionTypes.startWatchingCanvas)
    .mergeMap(action =>
      mouseEventStream(action.canvas)
        .map(line => updateCanvas(line))
        .takeUntil(action$.ofType(actionTypes.stopWatchingCanvas))
    );

export const storeRoomEpic = (action$, store) =>
  Observable.merge(
    action$.ofType(actionTypes.updateCanvas).sampleTime(200),
    action$.ofType(actionTypes.addParticipant)
  )
    .do(() => {
      const { room } = store.getState();
      hzRooms.update(room);
    })
    .mapTo(noOp());
