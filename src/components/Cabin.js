import React from 'react';
import './Cabin.css';

const Cabin = (props) => {
  const { id, number, description} = props;
  return (
    <div className="Cabin" key={id}>
      <div className="Cabin-content">
        <h3>Hytti: {number}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Cabin;
