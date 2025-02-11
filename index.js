/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import ContextProvider from './src/Contexts/Context';

const Root = () => (
  <ContextProvider>
    <App />
  </ContextProvider>
);

AppRegistry.registerComponent(appName, () => Root);
