import { createRouter } from '@expo/ex-navigation';

import MapScreen from '../screens/MapScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  home: () => MapScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
}));
