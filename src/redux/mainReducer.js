import { SET_INITIAL_TIME, SET_FINAL_TIME, ADD_LAP, SET_PAUSE, STOP_TIME, RESET_LAPS } from './constants';

const initialState = {
  initialTime: 0,
  finalTime: 0,
  isRunning: null,
  laps: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_TIME:
      return {
        ...state,
        initialTime: action.payload,
      };
    case SET_FINAL_TIME:
      return {
        ...state,
        finalTime: action.payload,
      };

    case SET_PAUSE:
      return {
        ...state,
        isRunning: action.payload,
      };

    case ADD_LAP:
      return {
        ...state,
        laps: [...state.laps, action.payload],
      };

    case RESET_LAPS:
      return {
        ...state,
        laps: [],
      };

    case STOP_TIME:
      return {
        ...state,
        initialTIme: 0,
        finalTime: 0,
        isRunning: null,
      };

    default:
      return state;
  }
};
