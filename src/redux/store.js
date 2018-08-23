import { createStore } from 'redux';
import rootReducer from './rootReducer';

const getStore = () => {
  const store = createStore(rootReducer);
  return store;
};

export default getStore;
