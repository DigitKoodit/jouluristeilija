import { Map, List } from 'immutable';

const CABINS_KEY = 'cabins';
export const CABIN_TO_BE_CREATED_KEY = 'cabinToBeCreated';

const CABIN_CREATE_TOGGLED = 'cabinCreateToggled';
const CABIN_ADDED = 'cabinAdded';

export const cabinCreateToggled = key => ({
  type: CABIN_CREATE_TOGGLED,
  key
});

export const cabinCreated = cabin => ({
  type: CABIN_ADDED,
  cabin
});

export default (state=Map(), action) => {
  const { type, key } = action;
  switch(type){
    case CABIN_CREATE_TOGGLED:
      const currentState = state.get(key);
      return state.set(key, !currentState);

    case CABIN_ADDED:
      const currentCabins = state.get(CABINS_KEY, List());
      return state.merge({
        CABINS_KEY: currentCabins.push(
          Map({ number: action.cabin.number, description: action.cabin.description })
        ),
        cabinToBeCreated: false
      });

    default: return state;
  }
}
