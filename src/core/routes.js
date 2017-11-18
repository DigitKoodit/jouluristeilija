import CabinScreen from '../screens/CabinScreen';
import InfoScreen from '../screens/InfoScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import MapScreen from '../screens/MapScreen';
import SplashScreen from '../screens/SplashScreen';

export default [
  { path: '/',
    component: SplashScreen,
  },
  { path: '/schedule',
    symbol: 'Schedule',
    component: ScheduleScreen,
  },
  { path: '/cabins',
    symbol: 'Cabins',
    component: CabinScreen,
  },
  { path: '/map',
    symbol: 'Map',
    component: MapScreen,
  },
  { path: '/info',
    symbol: 'Info',
    component: InfoScreen,
  },
];