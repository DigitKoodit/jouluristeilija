import localForage from 'localforage';

export const USER_ID_KEY = 'userId';
export const USER_NAME_KEY = 'userName'

export const getUuid = () => {
  let identity  = new Date().getTime();
  return'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (identity + Math.random()*16)%16 | 0;
    identity = Math.floor(identity / 16);
    return (c === 'x' ? r : (r&0x3|0x8)).toString(16);
  });
}

export function storeChatCredentials(userName) {
  console.log('Storing credentials locally');
  const userId = getUuid();
  return Promise.resolve()
    .then(() => localForage.setItem(USER_ID_KEY, userId))
    .catch(err => console.error(err))
    .then(() => localForage.setItem(USER_NAME_KEY, userName))
    .catch(err => console.error(err))
    .then(() => userId);
  }