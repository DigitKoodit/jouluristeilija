import React from 'react';
import { connect } from 'react-redux';
import './OpeningHours.css';
import { formatTime, happeningNow } from '../core/time';

const stateToProps = ({ schedules }) => ({ openingHours: schedules.get('openingHours') })

const OpeningHours = (props) => {
  const { openingHours } = props;
  const currentTime = new Date();

  const categories = openingHours.map(item => item.get('category'))
    .toSet()
    .toList();

  return [
    <h2 className="EventScheduleHeader">Aukioloajat</h2>,
    categories.map(category =>
      <div key={category} className="OpeningHoursCategory">
        <h3 className="OpeningHoursCategory-title">{category}</h3>
        {
          openingHours
            .filter(item => item.get('category') === category)
            .map((item, idx) =>
              <div key={idx} className="OpeningHoursItem">
                <div className="OpeningHoursItem-content">
                  <h3>{item.get('name')}</h3>
                  <p>Kansi: {item.get('deck')}</p>
                </div>
                <div className="OpeningHoursItem-hours">
                  <p className="OpeningHoursItem-hoursLabel">Aukioloajat</p>
                  { item.get('times').map((time, idx) => {
                    const startTime = time.get('epochStart') ? formatTime(time.get('epochStart')) : false;
                    const endTime = time.get('epochEnd') ? formatTime(time.get('epochEnd')) : false;
                    const active = happeningNow(time.get('epochStart'), time.get('epochEnd'));
                    return (
                      <div
                        key={time.get('epochStart')+ idx}
                        className={`OpeningHoursItem-time ${active ? 'OpeningHoursItem-time--Active' : ''}`}
                      >
                        {startTime && <span className="OpeningHoursItem-time">{startTime}</span>}
                        {startTime && endTime && <span className="OpeningHoursItem-timeDivider"> - </span>}
                        {endTime &&<span className="OpeningHoursItem-time">{endTime}</span>}
                      </div>
                    )
                  })
                  }
                </div>
              </div>
            )
        }
      </div>
    )
  ];
}

export default connect(stateToProps)(OpeningHours);

// openingHours.map((item, index) => {
//   return (

//   )
// } )
