import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

import boat from '../images/icon-boat.svg';
import note from '../images/icon-note.svg';
import info from '../images/icon-info.svg';
import time from '../images/icon-time.svg';
import chat from '../images/icon-chat.svg';

const routeIcons = {
  'Map': boat,
  'Cabins': note,
  'Info': info,
  'Schedule': time,
  'Chat': chat,
}

const Navigation = ({ routes }) =>
  <ul className="Navigation">
    { routes.map((route, i) => {
      if (!route.symbol) return null;
      return (
        <li key={i} className="Navigation-Link">
          <Link to={route.path}>
            <img alt={route.symbol} className="Navigation-icon" src={routeIcons[route.symbol]} />
          </Link>
        </li>
      ) }
    ) }
  </ul>;

export default Navigation;