import { Map } from 'immutable';

const VIEW_CONFIG_TOGGLED = 'uiConfigToggled';

export const uiConfigToggled = key => ({
  type: VIEW_CONFIG_TOGGLED,
  key
});

export default (state = Map(), action) => {
  const { type, key } = action;
  switch(type){
    case VIEW_CONFIG_TOGGLED:
      const currentState = state.get(key); // Going the long way around to avoid having to initalize keys in initialState
      return state.set(key, !currentState);
    default: return state;
  } 
}