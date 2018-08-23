import * as a from './constants';

const addTime = time => ({
  type: a.ADD_TIME,
  payload: time,
});

const togglePause = () => ({
  type: a.TOGGLE_PAUSE,
});

export { addTime, togglePause };
