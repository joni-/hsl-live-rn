import { createActions, createReducer } from 'reduxsauce';


const { Types, Creators } = createActions({
  start: null,
  stop: null,
  streamStarted: null,
  streamStopped: null,
  handleBus: ['topic', 'message'],
  handleTram: ['topic', 'message']
});

export const HslTypes = Types;
export default Creators;

// -- initial state

const INITIAL_STATE = {
  streaming: false,
  busses: {},
  trams: {}
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

const handleBus = (state = INITIAL_STATE, { topic, message }) => {
  const hslObject = message.VP;
  const latitude = hslObject.lat;
  const longitude = hslObject.long;
  const line = hslObject.desi;
  const vehicleId = hslObject.veh;

  return {
    ...state,
    busses: {
      ...state.busses,
      [vehicleId]: {
        longitude,
        latitude,
        line
      }
    }
  };
}

const handleTram = (state = INITIAL_STATE, { topic, message }) => {
  const hslObject = message.VP;
  const latitude = hslObject.lat;
  const longitude = hslObject.long;
  const line = hslObject.desi;
  const vehicleId = hslObject.veh;

  return {
    ...state,
    trams: {
      ...state.trams,
      [vehicleId]: {
        longitude,
        latitude,
        line
      }
    }
  };
}

// -- tie up the reducers to action types

const HANDLERS = {
  [Types.STREAM_STARTED]: start,
  [Types.STREAM_STOPPED]: stop,
  [Types.HANDLE_BUS]: handleBus,
  [Types.HANDLE_TRAM]: handleTram
};

export const reducer = createReducer(INITIAL_STATE, HANDLERS);