import { Map, List, fromJS } from 'immutable';

export const CABINS_DB_KEY = 'cabins';

export const CABINS_KEY = 'cabins';
export const CABIN_TO_BE_CREATED_KEY = 'cabinToBeCreated';

const CABIN_CREATE_TOGGLED = 'cabinCreateToggled';
export const CABIN_ADDED = 'cabinAdded';
const CABINS_FETCHED = 'cabinsFetched';

export const cabinCreateToggled = key => ({
  type: CABIN_CREATE_TOGGLED,
  key
});

export const cabinCreated = cabin => ({
  type: CABIN_ADDED,
  cabin
});

export const cabinsFetched = cabins => ({
  type: CABINS_FETCHED,
  cabins
});

export default (state = Map(), action) => {
  const { type, key } = action;
  switch (type) {
    case CABIN_CREATE_TOGGLED:
      const currentState = state.get(key);
      return state.set(key, !currentState);

    case CABIN_ADDED:
      const currentCabins = state.get(CABINS_KEY, List());
      const newCabins = currentCabins.push(
        Map({ id: Date.now().toString(), number: action.cabin.number, description: action.cabin.description })
      );
      return state.merge({
        [CABINS_KEY]: newCabins,
        cabinToBeCreated: false
      });

    case CABINS_FETCHED:
      return state.set(CABINS_KEY, fromJS(action.cabins));

    default: return state;
  }
}
