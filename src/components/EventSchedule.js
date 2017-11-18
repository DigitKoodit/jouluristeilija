import React from 'react';
import { connect } from 'react-redux';
import './EventSchedule.css';
import { formatTime } from '../core/time';

const stateToProps = ({ schedules }) => ({ eventHours: schedules.get('eventSchedule') })

const EventSchedule = (props) => {
  const { eventHours } = props;
  const currentTime = new Date();

  return [
    <h2 className="EventScheduleHeader">Risteilyaikataulu</h2>,
    eventHours.map((item, index) => {
      const startTime = item.get('epochStart') ? formatTime(item.get('epochStart')) : false;
      const endTime = item.get('epochEnd') ? formatTime(item.get('epochEnd')) : false;
      return (
        <div key={item.get('id')} className="EventScheduleItem">
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

export default connect(stateToProps)(EventSchedule);