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
  updateRoomNotCanvas: 'UPDATE_ROOM_NOT_CANVAS',
  showToast: 'SHOW_TOAST',
  destroyToast: 'DESTROY_TOAST',
  clearRoomForm: 'CLEAR_ROOMFORM',
  clearProfileForm: 'CLEAR_PROFILEFORM',
  initializeApp: 'INITIALIZE_APP',
  startWatchingCanvas: 'START_WATCHING_CANVAS',
  stopWatchingCanvas: 'STOP_WATCHING_CANVAS',
  updateCanvas: 'UPDATE_CANVAS',
  clearCanvas: 'CLEAR_CANVAS',
  noOp: 'NO_OP',
  setDrawingSettings: 'SET_DRAWING_SETTINGS',
  clearRoom: 'CLEAR_ROOM',
  sendMessage: 'SEND_MESSAGE',
  addParticipant: 'ADD_PARTICIPANT',
  startGame: 'START_GAME',
  resumeGame: 'RESUME_GAME',
  pauseGame: 'PAUSE_GAME',
  receiveWord: 'RECEIVE_WORD',
  updateChat: 'UPDATE_CHAT',
  startCountdown: 'START_COUNTDOWN',
  loseRound: 'LOSE_ROUND',
  winRound: 'WIN_ROUND',
  tick: 'TICK',
  showCanvasMessage: 'SHOW_CANVAS_MESSAGE',
  destroyCanvasMessage: 'DESTROY_CANVAS_MESSAGE',
  nextRound: 'NEXT_ROUND',
  completeGame: 'COMPLETE_GAME',
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
export const createRoom = (name, user) => ({ type: actionTypes.createRoom, name, user });
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
export const startWatchingCanvas = canvas => ({ type: actionTypes.startWatchingCanvas, canvas });
export const stopWatchingCanvas = canvas => ({ type: actionTypes.stopWatchingCanvas, canvas });
export const logout = () => ({ type: actionTypes.logout });
export const updateRoom = room => ({ type: actionTypes.updateRoom, room });
export const clearRoom = () => ({ type: actionTypes.clearRoom });
export const updateRoomNotCanvas = room => ({ type: actionTypes.updateRoomNotCanvas, room });
export const showToast = (status, message) => ({ type: actionTypes.showToast, status, message });
export const destroyToast = () => ({ type: actionTypes.destroyToast });
export const initializeApp = () => ({ type: actionTypes.initializeApp });
export const updateCanvas = data => ({ type: actionTypes.updateCanvas, data });
export const clearCanvas = () => ({ type: actionTypes.clearCanvas });
export const noOp = () => ({ type: actionTypes.noOp });
export const setDrawingSettings = settings => ({ type: actionTypes.setDrawingSettings, settings });
export const sendMessage = message => ({ type: actionTypes.sendMessage, message });
export const addParticipant = user => ({ type: actionTypes.addParticipant, user });
export const startGame = () => ({ type: actionTypes.startGame });
export const pauseGame = () => ({ type: actionTypes.pauseGame });
export const resumeGame = () => ({ type: actionTypes.resumeGame });
export const receiveWord = word => ({ type: actionTypes.receiveWord, word });
export const updateChat = chat => ({ type: actionTypes.updateChat, chat });
export const startCountdown = () => ({ type: actionTypes.startCountdown });
export const loseRound = () => ({ type: actionTypes.loseRound });
export const winRound = () => ({ type: actionTypes.winRound });
export const tick = () => ({ type: actionTypes.tick });
export const showCanvasMessage = message => ({ type: actionTypes.showCanvasMessage, message });
export const destroyCanvasMessage = () => ({ type: actionTypes.destroyCanvasMessage });
export const nextRound = () => ({ type: actionTypes.nextRound });
export const completeGame = () => ({ type: actionTypes.completeGame });
