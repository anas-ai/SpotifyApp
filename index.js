/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import ContextProvider from './src/Contexts/Context';
import TrackPlayer from 'react-native-track-player';
import {ToastProvider} from 'react-native-toast-notifications';

const Root = () => (
  <ContextProvider>
    <ToastProvider>
      <App />
    </ToastProvider>
  </ContextProvider>
);

AppRegistry.registerComponent(appName, () => Root);
TrackPlayer.registerPlaybackService(() => require('./Service.js'));
