import { combineReducers } from 'redux';
import cabins from './cabins';
import schedules from './schedules';
import viewConfig from './viewConfig';

export default combineReducers({
  cabins,
  schedules,
  viewConfig,
});
