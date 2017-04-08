export const actionTypes = {
  setProfileFormUsername: 'SET_PROFILEFORM_USERNAME',
  setProfileFormState: 'SET_PROFILEFORM_STATE',
  setRoomFormName: 'SET_ROOMFORM_NAME',
  setRoomFormState: 'SET_ROOMFORM_STATE',
  createRoom: 'CREATE_ROOM',
  createRoomFulfilled: 'CREATE_ROOM_FULFILLED',
  createRoomRejected: 'CREATE_ROOM_REJECTED',
  setUsername: 'SET_USERNAME',
  setUsernameFulfilled: 'SET_USERNAME_FULFILLED',
  setUsernameRejected: 'SET_USERNAME_REJECTED',
  fetchRoomNameValidity: 'FETCH_ROOMNAME_VALIDITY',
  fetchRoomNameValidityFullfilled: 'FETCH_ROOMNAME_VALIDITY_FULFILLED',
  fetchRoomNameValidityRejected: 'FETCH_ROOMNAME_VALIDITY_REJECTED',
  fetchUsernameValidity: 'FETCH_USERNAME_VALIDITY',
  fetchUsernameValidityFullfilled: 'FETCH_USERNAME_VALIDITY_FULFILLED',
  fetchUsernameValidityRejected: 'FETCH_USERNAME_VALIDITY_REJECTED',
  fetchUserAuth: 'FETCH_USER_AUTH',
  fetchUserAuthFulfilled: 'FETCH_USER_AUTH_FULFILLED',
  fetchUserAuthRejected: 'FETCH_USER_AUTH_REJECTED',
  startWatchingRoom: 'START_WATCHING_ROOM',
  stopWatchingRoom: 'STOP_WATCHING_ROOM',
  wathingRoomRejected: 'WATCHING_ROOM_REJECTED',
  logout: 'LOGOUT',
  updateRoom: 'UPDATE_ROOM',
  showToast: 'SHOW_TOAST',
  destroyToast: 'DESTROY_TOAST',
  clearRoomForm: 'CLEAR_ROOMFORM',
  clearProfileForm: 'CLEAR_PROFILEFORM',
};

export const setProfileFormUsername = name => ({ type: actionTypes.setProfileFormUsername, name });
export const setProfileFormState = state => ({ type: actionTypes.setProfileFormState, state });
export const setRoomFormName = name => ({ type: actionTypes.setRoomFormName, name });
export const setRoomFormState = state => ({ type: actionTypes.setRoomFormState, state });
export const clearRoomForm = () => ({ type: actionTypes.clearRoomForm });
export const clearProfileForm = () => ({ type: actionTypes.clearProfileForm });

export const setUsername = name => ({ type: actionTypes.setUsername, name });
export const setUsernameFulfilled = () => ({ type: actionTypes.setUsernameFulfilled });
export const setUsernameRejected = () => ({ type: actionTypes.setUsernameRejected });

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

export const fetchUsernameValidity = () => ({ type: actionTypes.fetchUsernameValidity });
export const fetchUsernameValidityFulfilled = isValid => ({
  type: actionTypes.fetchUsernameValidityFullfilled,
  isValid,
});
export const fetchUsernameValidityRejected = error => ({
  type: actionTypes.fetchUsernameValidityRejected,
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
export const showToast = (status, message) => ({ type: actionTypes.showToast, status, message });
export const destroyToast = () => ({ type: actionTypes.destroyToast });

