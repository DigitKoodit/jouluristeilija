import { Map } from 'immutable';

const VIEW_CONFIG_TOGGLED = 'viewConfigToggled';
const VIEW_MAP_CHANGED = 'viewMapChanged';

export const viewConfigToggled = key => ({
  type: VIEW_CONFIG_TOGGLED,
  key
});

export const selectMapSource = mapSource => ({
  type: VIEW_MAP_CHANGED,
  payload: mapSource,
})

export default (state = Map(), action) => {
  const { type, key, payload } = action;
  switch(type){
    case VIEW_MAP_CHANGED:
      return state.set('selectedMap', payload);
    case VIEW_CONFIG_TOGGLED:
      const currentState = state.get(key); // Going the long way around to avoid having to initalize keys in initialState
      return state.set(key, !currentState);
    default: return state;
  } 
}