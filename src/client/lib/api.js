import { ajax } from 'rxjs/observable/dom/ajax';
import { API_BASE, PROTOCOL } from '../constants';

export const getRoom = name => ajax.getJSON(`${PROTOCOL}://${API_BASE}/api/rooms/${name}`);

export const getRandomWord = () => ajax.getJSON(`${PROTOCOL}://${API_BASE}/api/words/random`);

export const x = x => x;
