import { fromJS, List, Map } from 'immutable';
import { storeChatCredentials } from '../core/auth';
import {
  ERROR_TYPE,
  pushMessage,
  initializeChatListeners
} from '../core/fireApi';

const INITIALIZE_CHAT = 'initializeChat';
const MESSAGES_LOADED = 'messagesLoaded';
const MESSAGE_SENT = 'messageSent';
const ERROR_HAPPENED = 'errorHappened';
const SET_USER_ID = 'setUserId';
const SET_USER_NAME = 'setUserName';

export const setUserName = userName => ({
  type: SET_USER_NAME,
  userName,
});

export const setUserId = userId => ({
  type: SET_USER_ID,
  userId,
});

export const messageLoaded = (message) => ({
  type: MESSAGES_LOADED,
  message: message
})

const chatInitialized = () => ({
  type: INITIALIZE_CHAT,
})

const messageSent = () => ({
  type: MESSAGE_SENT,
});

const errorHappened = (err) => ({
  type: ERROR_HAPPENED,
  error: err,
});

export const initializeChat = (userNick) => {
  return (dispatch, getState) => {
    const { chat } = getState();
    const { userName, userId } = chat.toJS();
    return Promise.resolve()
    .then(() => {
      if (!userId || !userName) {
        storeChatCredentials(userNick)
          .then((userId) => dispatch(setUserId(userId)));
        dispatch(setUserName(userNick));
      } else {
        dispatch(setUserName(userName));
        dispatch(setUserId(userId));
      }
    })
    .then(() => initializeChatListeners(dispatch))
    .then(() => dispatch(chatInitialized()))
  }
}

export const sendMessage = (userId, userName, message) => {
  return dispatch => {
    return Promise.resolve(pushMessage(userId, userName, message))
      .then(response => {
        if (response.type === ERROR_TYPE) {
          console.log('Something went wrong')
          return dispatch(errorHappened(response.message));
        }
        return dispatch(messageSent())
      });
  }
}


const initialState = fromJS({
  initialized: false,
  error: null,
  userName: null,
  userId: null,
  userMessage: '',
  messages: List.of(
    Map({
      userId: 'ADMIN',
      userName: 'Risteilyappi',
      message: 'Tervetuloa risteilychättiin. Toiminnallisuus on ekaa kertaa testissä joten huomioithan että ongelmia huonoilla yhteyksillä varmasti tulee. Otathan muut huomioon viesteissäsi.',
      timeStamp: 0,
    }),
  ),
});

export default (state = initialState, action) => {
  const { type, message, userName, userId, error } = action;
  switch(type){
    case INITIALIZE_CHAT:
      console.log('Chat has been initialized');
      return state.set('initialized', true);

    case SET_USER_ID:
    return state.set('userId', userId);

    case SET_USER_NAME:
      return state.set('userName', userName)
    
    case MESSAGES_LOADED:
      return state.update('messages', oldMessages =>
        oldMessages.push(message)
      );

    case MESSAGE_SENT:
      return state.set('userMessage', '');

    case ERROR_HAPPENED:
      return state.set('error', error)
    default:
      return state;
  } 
}