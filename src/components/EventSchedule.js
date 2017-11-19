import React from 'react';
import { connect } from 'react-redux';
import './EventSchedule.css';
import { formatTime, happeningNow, timePassed } from '../core/time';
import { viewConfigToggled } from '../stores/viewConfig';

const SHOW_OLD_ITEMS = 'scheduleShowOld';

const stateToProps = ({ schedules, viewConfig }) => {
  const unfilteredHours = schedules.get('eventSchedule');
  if (viewConfig.get(SHOW_OLD_ITEMS, false)) return {
    eventHours: unfilteredHours,
    filtered: false,
  };
  return {
    eventHours: unfilteredHours.filter(event => !timePassed(event.get('epochEnd'))),
    filtered: true,
  };
}

const actionsToProps = (dispatch) => ({
  showOldItems: () => dispatch(viewConfigToggled(SHOW_OLD_ITEMS)),
});

const EventSchedule = (props) => {
  const { eventHours, showOldItems, filtered } = props;
  const sortedHours = eventHours.sort((a, b) => a.get('epochStart') - b.get('epochStart'));
  
  return [
    <h2 className="EventScheduleHeader">Risteilyaikataulu</h2>,
    <button onClick={() => showOldItems()} className="EventSchedule-showOldButton">
      { filtered ? 'Näytä menneet' : 'Piilota menneet' }
    </button>,
    sortedHours.map((item, index) => {
      const startTime = item.get('epochStart') ? formatTime(item.get('epochStart')) : false;
      const endTime = item.get('epochEnd') ? formatTime(item.get('epochEnd')) : false;
      const active = happeningNow(item.get('epochStart'), item.get('epochEnd'));
      const finished = timePassed(item.get('epochEnd'));
      return (
        <div
          key={item.get('id')}
          className={
            `EventScheduleItem 
            ${active ? 'EventScheduleItem--Active' : ''}
            ${finished ? 'EventScheduleItem--Finished' : ''}
            `
          }
        >
          <div className="EventScheduleItem-hours">
            {startTime && <span className="EventScheduleItem-time">{startTime}</span>}
            {startTime && endTime && <span className="EventScheduleItem-timeDivider"> - </span>}
            {endTime &&<span className="EventScheduleItem-time">{endTime}</span>}
          </div>
          <div className="EventScheduleItem-content">
            <h3>{item.get('name')}</h3>
            <p>{item.get('description')}</p>
          </div>
        </div>
      ) }
    )
  ];
}

export default connect(stateToProps, actionsToProps)(EventSchedule);