import React from 'react';
import { Provider } from 'react-redux';
import Main from './src/scenes/main/main';
import getStore from './src/redux/store';

const store = getStore();

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider >
);

export default App;
