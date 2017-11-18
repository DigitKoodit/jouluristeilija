import CabinScreen from '../screens/CabinScreen';
import InfoScreen from '../screens/InfoScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import MapScreen from '../screens/MapScreen';
import SplashScreen from '../screens/SplashScreen';

export default [
  { path: '/',
    component: SplashScreen,
  },
  { path: '/Schedule',
    symbol: 'Schedule',
    component: ScheduleScreen,
  },
  { path: '/Cabins',
    symbol: 'Cabins',
    component: CabinScreen,
  },
  { path: '/Map',
    symbol: 'Map',
    component: MapScreen,
  },
  { path: '/info',
    symbol: 'Info',
    component: InfoScreen,
  },
];