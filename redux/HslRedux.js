import { createActions, createReducer } from 'reduxsauce';


const { Types, Creators } = createActions({
  start: null,
  stop: null,
  streamStarted: null,
  streamStopped: null,
  handle: ['topic', 'message']
});

export const HslTypes = Types;
export default Creators;

// -- initial state

const INITIAL_STATE = {
  streaming: false,
  busses: []
};

// -- reducers

const start = (state = INITIAL_STATE) => ({
  ...state,
  streaming: true
});

const stop = (state = INITIAL_STATE) => ({
  ...state,
  streaming: false
})

const handle = (state = INITIAL_STATE, { topic, message }) => {
  return state;
}

// -- tie up the reducers to action types

const HANDLERS = {
  [Types.STREAM_STARTED]: start,
  [Types.STREAM_STOPPED]: stop,
  [Types.HANDLE]: handle
};

export const reducer = createReducer(INITIAL_STATE, HANDLERS);