import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/debounceTime';
import { actionTypes, noOp, showToast } from '../actions';
import { hzRooms } from '../../lib/horizon';

export const x = 2;

export const sendMessageEpic = (action$, store) =>
  action$.ofType(actionTypes.sendMessage)
    .debounceTime(200)
    .mergeMap((action) => {
      const room = store.getState().room;
      const newRoom = Object.assign({}, room, { chat: [...room.chat, action.message] });
      return hzRooms.update(newRoom)
        .mapTo(noOp())
        .catch(() => showToast('critical', 'Cannot send your message. Please check you connection and try again.'));
    });
