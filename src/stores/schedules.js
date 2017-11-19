import { fromJS } from 'immutable';
import scheduleData from './json/scheduleData.json';
import openingHourData from './json/hourData.json';

const initialState = fromJS({
  openingHours: openingHourData,
  eventSchedule: scheduleData,
})

export default (state = initialState, action) => {
  const { type } = action;
  switch(type){
    default: return state;
  } 
}