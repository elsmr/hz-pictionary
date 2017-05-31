import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/debounceTime';
import { actionTypes, updateChat } from '../actions';
import { CHAT_MAX_LENGTH } from '../../constants';

export const x = 2;

export const sendMessageEpic = (action$, store) =>
  action$.ofType(actionTypes.sendMessage)
    .debounceTime(200)
    .mergeMap((action) => {
      let chat = [...store.getState().room.chat, action.message];
      if (chat.length > CHAT_MAX_LENGTH) {
        chat = chat.slice(Math.max(chat.length - CHAT_MAX_LENGTH, 1));
      }
      return Observable.of(updateChat(chat));
    });
