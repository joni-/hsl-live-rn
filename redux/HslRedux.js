import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';


const { Types, Creators } = createActions({
  start: ['filters'],
  update: ['filters'],
  stop: null,
  streamStarted: null,
  streamStopped: null,
  handleBus: ['topic', 'message'],
  handleTram: ['topic', 'message'],
  handleSubway: ['topic', 'message'],
  handleTrain: ['topic', 'message'],
  handleFerry: ['topic', 'message'],
  clear: ['vehicle']
});

export const HslTypes = Types;
export default Creators;

// -- initial state

const INITIAL_STATE = Immutable({
  streaming: false,
  busses: Immutable({}),
  trams: Immutable({}),
  subways: Immutable({}),
  trains: Immutable({}),
  ferries: Immutable({})
});

// -- reducers

const start = (state = INITIAL_STATE) => ({
  ...state,
  streaming: true
});

const stop = (state = INITIAL_STATE) => ({
  ...state,
  streaming: false
})

const handleVehicleChanges = (vehicle, state, { topic, message }) => {
  const hslObject = message.VP;
  const latitude = hslObject.lat;
  const longitude = hslObject.long;
  const line = hslObject.desi;
  const vehicleId = hslObject.veh;

  const newVehicleObject = Immutable({
    longitude,
    latitude,
    line
  });

  return Immutable.setIn(state, [vehicle, vehicleId], newVehicleObject);
}

const handleBus = (state = INITIAL_STATE, action) =>
  handleVehicleChanges('busses', state, action);

const handleTram = (state = INITIAL_STATE, action) =>
  handleVehicleChanges('trams', state, action)

const handleSubway = (state = INITIAL_STATE, action) =>
  handleVehicleChanges('subways', state, action);

const handleTrain = (state = INITIAL_STATE, action) =>
  handleVehicleChanges('trains', state, action);

const handleFerry = (state = INITIAL_STATE, action) =>
  handleVehicleChanges('ferries', state, action);

const clear = (state = INITIAL_STATE, { vehicle }) =>
  Immutable.set(state, vehicle, Immutable({}));

// -- tie up the reducers to action types

const HANDLERS = {
  [Types.STREAM_STARTED]: start,
  [Types.STREAM_STOPPED]: stop,
  [Types.HANDLE_BUS]: handleBus,
  [Types.HANDLE_TRAM]: handleTram,
  [Types.HANDLE_SUBWAY]: handleSubway,
  [Types.HANDLE_TRAIN]: handleTrain,
  [Types.HANDLE_FERRY]: handleFerry,
  [Types.CLEAR]: clear
};

export const reducer = createReducer(INITIAL_STATE, HANDLERS);