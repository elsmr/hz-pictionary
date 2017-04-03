import { ajax } from 'rxjs/observable/dom/ajax';
import { API_BASE, PROTOCOL } from '../constants';

export const getRoom = name => ajax.getJSON(`${PROTOCOL}://${API_BASE}/rooms/${name}`);

export const x = x => x;
