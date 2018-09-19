import { SET_INITIAL_TIME, SET_FINAL_TIME, ADD_LAP, RESET_LAPS, SET_PAUSE, STOP_TIME } from './constants';

export const setInitialTime = (time) => ({
  type: SET_INITIAL_TIME,
  payload: time,
});

export const setFinalTime = (time) => ({
  type: SET_FINAL_TIME,
  payload: time,
});

export const addLap = (lap) => ({
  type: ADD_LAP,
  payload: lap,
});

export const resetLaps = () => ({
  type: RESET_LAPS,
});

export const setPause = () => ({
  type: SET_PAUSE,
});

export const stopTime = () => ({
  type: STOP_TIME,
});
