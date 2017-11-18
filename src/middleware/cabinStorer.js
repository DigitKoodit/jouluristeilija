import { CABIN_ADDED, CABINS_DB_KEY } from '../stores/cabins';
import { Set } from 'immutable';
import localforage from 'localforage';

// A set of actions which require updating IndexedDB.
const actionsThatRequireUpdate = Set.of(
  CABIN_ADDED
);

// Store the cabins to IndexedDB.
function storeCabins(cabins) {
  return Promise.resolve()
    .then(() => localforage.setItem(CABINS_DB_KEY, cabins))
    .catch(err => console.error(err));
}

export default function({ getState }) {
  return next => action => {
    // Call the next dispatch method in the middleware chain.
    let returnValue = next(action)

    if (actionsThatRequireUpdate.includes(action.type)) {
      const newCabins = getState().cabins.get('cabins', null);
      storeCabins(newCabins.toJS());
    }

    return returnValue
  }
}
