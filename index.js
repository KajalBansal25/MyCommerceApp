/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import userReducer from './src/reducers/userReducer';
import { Provider} from 'react-redux';
import { createStore } from 'redux';

const store = createStore(userReducer);

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
