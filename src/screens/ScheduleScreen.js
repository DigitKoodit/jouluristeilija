import React from 'react';
import { connect } from 'react-redux';
import { viewConfigToggled } from '../stores/viewConfig';
import ScreenBottomButton from '../components/ScreenBottomButton';
import EventSchedule from '../components/EventSchedule';
import OpeningHours from '../components/OpeningHours';
import './ScheduleScreen.css';

const SCHEDULES_VISIBLE_KEY = 'schedulesVisible';

const stateToProps = ({ viewConfig }) => ({
  showHours: viewConfig.get(SCHEDULES_VISIBLE_KEY)
});

const actionsToProps = (dispatch) => ({
  toggleView: () => dispatch(viewConfigToggled(SCHEDULES_VISIBLE_KEY))
})

const Screen = (props) => {
  const { showHours, toggleView } = props;
  const buttonLabel = showHours ? 'Näytä aikataulu' : 'Näytä aukioloajat'
  return [
    <div className="ScreenContainer ScheduleScreen">
      { showHours
        ? <OpeningHours />
        : <EventSchedule />
      }

    </div>,
    <ScreenBottomButton action={() => toggleView()} label={buttonLabel} />
  ];
}

export default connect(stateToProps, actionsToProps)(Screen);
