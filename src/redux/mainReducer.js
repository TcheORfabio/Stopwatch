import * as a from './constants';

const initialState = {
  time: 0,
  pause: false,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case a.ADD_TIME:
      return {
        ...state,
        time: state.time + action.payload,
      };

    case a.TOGGLE_PAUSE:
      return {
        ...state,
        pause: !state.pause,
      };

    default: {
      return state;
    }
  }
};

export default mainReducer;
