/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import user_reducer from './src/reducers/user_reducer';

const global_store = configureStore({
  reducer: user_reducer,
});

const RNRedux = () => (
  <Provider store={global_store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
