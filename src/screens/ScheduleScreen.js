import React from 'react';
import { connect } from 'react-redux';
import { uiConfigToggled } from '../stores/viewConfig';
import ScreenBottomButton from '../components/ScreenBottomButton';
import './ScheduleScreen.css';

const SCHEDULES_VISIBLE_KEY = 'schedulesVisible';

const stateToProps = ({ viewConfig }) => ({
  showHours: viewConfig.get(SCHEDULES_VISIBLE_KEY)
});

const actionsToProps = (dispatch) => ({
  toggleView: () => dispatch(uiConfigToggled(SCHEDULES_VISIBLE_KEY))
})

const Screen = (props) => {
  const { showHours, toggleView } = props;
  return [
    <div className="ScreenContainer ScheduleScreen">
      { showHours
        ? 'Showing opening hours'
        : 'Showing event schedule'
      }

    </div>,
    <ScreenBottomButton action={() => toggleView()} label="Change view" />
  ];
}

export default connect(stateToProps, actionsToProps)(Screen);
