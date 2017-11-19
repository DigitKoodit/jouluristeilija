import { combineReducers } from 'redux';
import cabins from './cabins';
import chat from './chat';
import schedules from './schedules';
import viewConfig from './viewConfig';

export default combineReducers({
  chat,
  cabins,
  schedules,
  viewConfig,
});
