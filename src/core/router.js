import React from 'react';
import { Route } from 'react-router-dom';

const RouteWrapper = (route) =>
  <Route exact path={route.path} render={ props => {
    return <route.component key={route.path} { ...props } />;
  } }/>

export default ({ routes }) =>
  <div className="App-content">
    {routes.map((route, i) =>
      <RouteWrapper key={'wrapper-' + i} {...route}/>
    ) }
  </div>