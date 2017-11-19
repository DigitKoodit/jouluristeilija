import React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import logo from '../images/logo.png';
import sponsor from '../images/sponsor.png';
import './InfoScreen.css';
import './SplashScreen.css';

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
      <img alt="logo" className="SplashScreen-logo" src={logo} />
      <h2 className="SplashScreen-text">Risteilyllä mukana:</h2>
      <img alt="sponsor" className="SplashScreen-logo SplashScreen-sponsor" src={sponsor} />
      <div className="InfoScreen-some">
        <h2 className="SplashScreen-text">Risteilyt somessa:</h2>
        { wordCloud.map(hashtag => <span key={hashtag}>{hashtag}</span>) }
      </div>
    </div>
  );
}

export default connect(null, null)(Screen);
