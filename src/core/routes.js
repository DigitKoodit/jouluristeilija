import CabinScreen from '../screens/CabinScreen';
import InfoScreen from '../screens/InfoScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import MapScreen from '../screens/MapScreen';
import ChatScreen from '../screens/ChatScreen';

export default [
  { path: '/',
    component: InfoScreen,
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
  { path: '/chat',
    symbol: 'Chat',
    component: ChatScreen,
  },
  { path: '/info',
    symbol: 'Info',
    component: InfoScreen,
  },
  {
    path: '/schedule-embed',
    component: ScheduleScreen,
  }
];