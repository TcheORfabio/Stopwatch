import { SET_INITIAL_TIME, SET_FINAL_TIME, ADD_LAP, SET_LAP, RESET_LAPS, SET_PAUSE, STOP_TIME } from './constants';

export const setInitialTime = (time) => ({
  type: SET_INITIAL_TIME,
  payload: time,
});

export const setFinalTime = (time) => ({
  type: SET_FINAL_TIME,
  payload: time,
});

export const addLap = (lap, index) => ({
  type: ADD_LAP,
  payload: { lap, index },
});

export const setLap = (lap, index) => ({
  type: SET_LAP,
  payload: { lap, index },
});

export const resetLaps = () => ({
  type: RESET_LAPS,
});

export const setPause = (pause) => ({
  type: SET_PAUSE,
  payload: pause,
});

export const stopTime = () => ({
  type: STOP_TIME,
});
