import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/debounceTime';
import { actionTypes, updateChat, winRound } from '../actions';
import { CHAT_MAX_LENGTH } from '../../constants';

export const x = 2;

export const sendMessageEpic = (action$, store) =>
  action$.ofType(actionTypes.sendMessage)
    .debounceTime(200)
    .map((action) => {
      const state = store.getState();
      const { user, room } = state;
      const message = action.message;
      const isDrawingPlayer = user.id === room.game.drawingPlayer.id;
      let userIdWon = null;
      if (message.message.indexOf(room.game.currentWord) > -1) {
        if (isDrawingPlayer) {
          message.message = '*** I am a stupid cheater ***';
        } else {
          userIdWon = user.id;
        }
      }
      let chat = [...room.chat, action.message];
      if (chat.length > CHAT_MAX_LENGTH) {
        chat = chat.slice(Math.max(chat.length - CHAT_MAX_LENGTH, 1));
      }

      return [chat, userIdWon];
    })
    .mergeMap(([chat, userIdWon]) => {
      const actions = userIdWon ? [updateChat(chat), winRound(userIdWon)] : [updateChat(chat)];
      return Observable.of(...actions);
    });
