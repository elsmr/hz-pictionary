export const actionTypes = {
  setRoomFormName: 'SET_ROOMFORM_NAME',
  setRoomFormState: 'SET_ROOMFORM_STATE',
  createRoom: 'CREATE_ROOM',
  createRoomFulfilled: 'CREATE_ROOM_FULFILLED',
  createRoomRejected: 'CREATE_ROOM_REJECTED',
  fetchRoomNameValidity: 'FETCH_ROOMNAME_VALIDITY',
  fetchRoomNameValidityFullfilled: 'FETCH_ROOMNAME_VALIDITY_FULFILLED',
  fetchRoomNameValidityRejected: 'FETCH_ROOMNAME_VALIDITY_REJECTED',
  fetchUserAuth: 'FETCH_USER_AUTH',
  fetchUserAuthFulfilled: 'FETCH_USER_AUTH_FULFILLED',
  fetchUserAuthRejected: 'FETCH_USER_AUTH_REJECTED',
  startWatchingRoom: 'START_WATCHING_ROOM',
  stopWatchingRoom: 'STOP_WATCHING_ROOM',
  wathingRoomRejected: 'WATCHING_ROOM_REJECTED',
  logout: 'LOGOUT',
  updateRoom: 'UPDATE_ROOM',
};

export const setRoomFormName = name => ({ type: actionTypes.setRoomFormName, name });
export const setRoomFormState = state => ({ type: actionTypes.setRoomFormState, state });

export const createRoom = name => ({ type: actionTypes.createRoom, name });
export const createRoomFulfilled = () => ({ type: actionTypes.createRoomFulfilled });
export const createRoomRejected = () => ({ type: actionTypes.createRoomRejected });

export const fetchRoomNameValidity = () => ({ type: actionTypes.fetchRoomNameValidity });
export const fetchRoomNameValidityFulfilled = isValid => ({
  type: actionTypes.fetchRoomNameValidityFullfilled,
  isValid,
});
export const fetchRoomNameValidityRejected = error => ({
  type: actionTypes.fetchRoomNameValidityRejected,
  error,
});

export const fetchUserAuth = () => ({ type: actionTypes.fetchUserAuth });
export const fetchUserAuthFulfilled = user => ({
  type: actionTypes.fetchUserAuthFulfilled,
  user,
});
export const fetchUserAuthRejected = error => ({
  type: actionTypes.fetchUserAuthRejected,
  error,
});

export const startWatchingRoom = name => ({ type: actionTypes.startWatchingRoom, name });
export const stopWatchingRoom = name => ({ type: actionTypes.stopWatchingRoom, name });
export const watchingRoomRejected = error => ({ type: actionTypes.watchingRoomRejected, error });

export const logout = () => ({ type: actionTypes.logout });
export const updateRoom = room => ({ type: actionTypes.updateRoom, room });

