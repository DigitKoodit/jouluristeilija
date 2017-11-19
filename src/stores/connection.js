import { fromJS } from 'immutable';

const CONNECTED = 'firebaseConnected';
const DISCONNECTED = 'firebaseDisconnected';

export const userConnected = timeStamp => ({
  type: CONNECTED,
  timeStamp,
})

export const userDisconnected = timeStamp => ({
  type: DISCONNECTED,
  timeStamp,
})

const initialState = fromJS({
  connected: false,
  connectionTime: null,
  disconnectionTime: null,
})

export default (state = initialState, action) => {
  const { type, timeStamp } = action;
  switch (type) {
    case CONNECTED:
      state
        .set('connectionTime', timeStamp)
        .set('connected', true);
    case DISCONNECTED:
      state
        .set('disconnectionTime', timeStamp)
        .set('connected', false);
    default: return state;
  } 
}