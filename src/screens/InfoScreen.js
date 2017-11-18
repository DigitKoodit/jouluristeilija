import React from 'react';
import { connect } from 'react-redux';

const Screen = (props) => {
  // const { ... } = props;
  return (
    <div className="ScreenContainer">
      <h2 className="ScreenContainer-title">Lisätietoja</h2>
    </div>
  );
}

export default connect(null, null)(Screen);
