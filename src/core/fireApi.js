import * as firebase from 'firebase';
import { Map, List } from 'immutable';
import { messageLoaded } from '../stores/chat';

export const ERROR_TYPE = 'RESPONSE_ERROR';
export const SUCCESS_TYPE = 'RESPONSE_SUCCESS';

const errorMessages = {
  connectivity: 'Viestiäsi ei saatu toimitettua. Tämä saattaa johtua huonosta yhteydestä tai palvelun ruuhkautumisesta.',
  authentication: 'Käyttäjänimi tai lähettäjä-ID eivät toimineet. Voit koittaa myöhemmin uudelleen.',
  message: 'Asiatonta tai tyhjää viestiä ei saatu toimitettua.',
  time: 'Viestisi aika-asetuksissa on jotain vikaa, tarkistathan että laitteesi kello on oikeassa ajassa.',
  messages: 'Viestejä ei saatu haettua, yhteydessä tai palvelimessa on jotain vikaa.',
};

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
};

firebase.initializeApp(config);

const messageRef = firebase.database().ref('messages/');


export function initializeChatListeners(dispatch) {
  messageRef.on('child_added', (snapshot) => {
    const message = Map(snapshot.val());
    dispatch(messageLoaded(message));
  });
}


function createResponse(type, message) {
  return { type, message };
}

export function fetchInitialMessages() {
  return messageRef.once('value')
    .then((response) => {
      return response.val();
    });
}

export const forbiddenNames = List.of(
  'admin',
  'after_lecture',
  'ylläpito',
  'yllapito',
  'risteilyappi',
  'jouluristeily',
  'afterlecture',
  'loimu',
  'loimury',
  'moderaattori',
  'mode',
  'risteilyäppi',
);

export function pushMessage(userId, userName, userMessage) {
  if (!userId || !userName) return createResponse(ERROR_TYPE, errorMessages.authentication);
  if (userMessage.length === 0) return createResponse(ERROR_TYPE, errorMessages.message);

  const messageTimeStamp = new Date().getTime();

  const messageMeta = messageRef.push();
  const messageKey = messageMeta.key;

  if (forbiddenNames.includes(userName.toLowerCase())) {
    alert('Elä viitti esiintyä ylläpitona, me ei tueta sellaista');
    return createResponse(ERROR_TYPE, errorMessages.authentication);
  }

  return messageRef.update({[messageKey]: {
    userId,
    userName,
    message: userMessage,
    timeStamp: messageTimeStamp
  }})
    .then((response) => createResponse(SUCCESS_TYPE, response))
    .catch((err) => createResponse(ERROR_TYPE, 'Something went wrong with writing data'));    
}
