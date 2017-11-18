import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

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

const Screen = (props) => {
  // const { ... } = props;
  return (
    <div className="ScreenContainer">
      CabinScreen
    </div>
  );
}

export default connect(null, null)(Screen);
