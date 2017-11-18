import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { cabinCreateToggled, cabinCreated, CABIN_TO_BE_CREATED_KEY } from '../stores/cabins';
import ScreenBottomButton from '../components/ScreenBottomButton';
import CabinCreateForm from '../components/CabinCreateForm';
import { Map } from 'immutable'

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
  showCabinCreateForm: cabins.get(CABIN_TO_BE_CREATED_KEY)
});

const actionsToProps = (dispatch) => ({
  toggleCabinCreate: () => dispatch(cabinCreateToggled(CABIN_TO_BE_CREATED_KEY)),
  addCabin: cabin => dispatch(cabinCreated(cabin))
});

const Screen = (props) => {
  const { showCabinCreateForm, toggleCabinCreate, addCabin } = props;
  return [
    <ScreenBottomButton action={() => toggleCabinCreate()} label="Add a new cabin" />,
    <div className="ScreenContainer">
      { showCabinCreateForm && <CabinCreateForm onCreate={addCabin} /> }
    </div>
  ];
}

export default connect(stateToProps, actionsToProps)(Screen);
