import React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import logo from '../images/logo.png';
import sponsor from '../images/sponsor.png';
import './InfoScreen.css';

const wordCloud = List.of(
  '#jouluristeily',
  '#jr17', '#ankkuriappro',
  '#after_lecture', '#yoloristeily17',
  '#blessed', '#avoint_lähdekoodii',
);

const Screen = (props) => {
  // const { ... } = props;
  return (
    <div className="ScreenContainer InfoScreen">
      <img className="SplashScreen-logo" src={logo} />
      <h2 className="SplashScreen-text">Risteilyllä mukana:</h2>
      <img className="SplashScreen-logo SplashScreen-sponsor" src={sponsor} />
      <div className="InfoScreen-some">
        <h2 className="SplashScreen-text">Risteilyt somessa:</h2>
        { wordCloud.map(hashtag => <bold>{hashtag}</bold>) }
      </div>
    </div>
  );
}

export default connect(null, null)(Screen);
