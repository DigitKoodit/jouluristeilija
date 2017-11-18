import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { cabinCreateToggled, cabinCreated, CABIN_TO_BE_CREATED_KEY, CABINS_KEY } from '../stores/cabins';
import ScreenBottomButton from '../components/ScreenBottomButton';
import CabinCreateModal from '../components/CabinCreateModal';
import CabinList from '../components/CabinList';
import { Map } from 'immutable'
import './ScheduleScreen.css';
import './CabinScreen.css';

// Functionality:
// Renders list of cabins user has saved into local storage
// Provides functionality to add and remove cabins

// Example cabin-item:
// Hytti: 8781
// Jarnon, Juhon ja Villen hytti

// TODO: (Task - Implementation)
// - Rendering of cabins - REACT
// - Addition of cabins - REACT
// - Save cabins to local storage automatically - REDUX
// - Remove cabins from local storage automatically - REDUX

const stateToProps = ({ cabins }) => ({
  showCabinCreateForm: cabins.get(CABIN_TO_BE_CREATED_KEY),
  cabins: cabins.get(CABINS_KEY)
});

const actionsToProps = (dispatch) => ({
  toggleCabinCreate: () => dispatch(cabinCreateToggled(CABIN_TO_BE_CREATED_KEY)),
  addCabin: cabin => dispatch(cabinCreated(cabin))
});

const Screen = (props) => {
  const { showCabinCreateForm, toggleCabinCreate, addCabin, cabins } = props;
  return [
    <div className="ScreenContainer CabinScreen">
      { !!cabins && <CabinList cabins={cabins} /> }
    </div>,
    <div>{ showCabinCreateForm && <CabinCreateModal onCreate={addCabin} onCancel={toggleCabinCreate} /> }</div>,
    <ScreenBottomButton action={() => toggleCabinCreate()} label="Lisää hytti" />
  ];
}

export default connect(stateToProps, actionsToProps)(Screen);
