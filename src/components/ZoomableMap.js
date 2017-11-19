import React, { Component } from 'react';
import './ZoomableMap.css';
import plusIcon from '../images/icon-plus.svg';
import minusIcon from '../images/icon-minus.svg';

const MIN_PADDING = 10;
const MAX_PADDING = 60;
const delta = 10;

class ZoomableMap extends Component {
  state = {
    containerPadding: 50,
  }

  zoomOut() {
    const { containerPadding } = this.state;
    if (containerPadding + delta > MAX_PADDING) return;
    return this.setState({ containerPadding: containerPadding + delta })
  }

  zoomIn() {
    const { containerPadding } = this.state;
    if (containerPadding - delta < MIN_PADDING) return;
    return this.setState({ containerPadding: containerPadding - delta })
  }

  render() {
    const { containerPadding } = this.state;
    const { mapSource } = this.props;
    const showZoomIn = containerPadding - delta >= MIN_PADDING;
    const showZoomOut = containerPadding + delta <= MAX_PADDING;
    return (
      <div className="ZoomableMap-container">
        { showZoomIn &&
          <button onClick={() => this.zoomIn()} className="ZoomableMap-button"><img alt="Plus" src={plusIcon} /></button>
        }
        { showZoomOut &&
          <button onClick={() => this.zoomOut()} className="ZoomableMap-button ZoomableMap-button--zoomOut"><img alt="Minus" src={minusIcon} /></button>
        }
        <div style={{ padding: containerPadding }} className="ZoomableMap">
          <img alt="map" className="ZoomableMap-image" src={mapSource} />
        </div>
      </div>
    )
  }
}

export default ZoomableMap;