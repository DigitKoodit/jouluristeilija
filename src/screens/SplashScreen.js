import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import logo from '../images/logo.png';
import sponsor from '../images/sponsor.png';
import './SplashScreen.css';

const Screen = (props) => {
  // const { ... } = props;
  return (
    <div className="ScreenContainer">
      <div className="SplashScreen-header">
        <img className="SplashScreen-logo" src={logo} />
        <h2 className="SplashScreen-text">Risteilyllä mukana:</h2>
        <img className="SplashScreen-logo SplashScreen-sponsor" src={sponsor} />
      </div>
    </div>
  );
}

export default connect(null, null)(Screen);
