import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import ZoomableMap from '../components/ZoomableMap';
import { selectMapSource }from '../stores/viewConfig';
import './ScreenContainer.css';
import './MapScreen.css';

import basicMap from '../images/map.png';
import barMap from '../images/map_bars.png';
import shopMap from '../images/map_shops.png';
import foodMap from '../images/map_restaurants.png';

const stateToProps = ({ viewConfig }) => ({
  selectedMap: viewConfig.get('selectedMap', 'basic'),
})

const actionsToProps = dispatch => ({
  selectMap: (source) => dispatch(selectMapSource(source)),
})

// Yes, the soddy strings in the actions are a bad habbit.
const mapSources = Map({
  basic: basicMap,
  bars: barMap,
  shops: shopMap,
  food: foodMap
})

const Screen = (props) => {
  const { selectedMap, selectMap } = props;
  return [
    <div className="ScreenContainer MapScreen">
      <h2 className="ScreenContainer-title">Laivakartta</h2>
      <ZoomableMap mapSource={mapSources.get(selectedMap)} />
    </div>,
    <div className="ScreenBottomButton MapScreen-buttons">
      <button onClick={() => selectMap('bars')}>Baarit</button>
      <button onClick={() => selectMap('food')}>Raflat</button>
      <button onClick={() => selectMap('shops')}>Kaupat</button>
  </div>
  ];
}

export default connect(stateToProps, actionsToProps)(Screen);
