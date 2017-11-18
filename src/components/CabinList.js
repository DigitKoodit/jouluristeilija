import React from 'react';
import Cabin from './Cabin';

const CabinList = (props) => {
  const { cabins } = props;
    return (
    <div className="CabinList">
      {cabins.map(cabin => (
        <Cabin
          id={cabin.get('id', '')}
          number={cabin.get('number')}
          description={cabin.get('description')}
        />
      ))}
    </div>
  );
};

export default CabinList;
