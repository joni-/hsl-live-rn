import { createActions, createReducer } from 'reduxsauce';


const { Types, Creators } = createActions({
  toggleBus: ['mode'],
  toggleTram: ['mode'],
  toggleSubway: ['mode'],
  toggleTrain: ['mode'],
  toggleFerry: ['mode'],
  filtersUpdated: ['vehicle', 'mode']
});

export const FilterTypes = Types;
export default Creators;

// -- initial state

const INITIAL_STATE = {
  bus: true,
  tram: true,
  subway: true,
  train: true,
  ferry: true
};

// -- reducers

const toggleBus = (state = INITIAL_STATE, { mode }) => ({
  ...state,
  bus: mode
});

const toggleTram = (state = INITIAL_STATE, { mode }) => ({
  ...state,
  tram: mode
});

const toggleSubway = (state = INITIAL_STATE, { mode }) => ({
  ...state,
  subway: mode
});

const toggleTrain = (state = INITIAL_STATE, { mode }) => ({
  ...state,
  train: mode
});

const toggleFerry = (state = INITIAL_STATE, { mode }) => ({
  ...state,
  ferry: mode
});

const updateFilters = (state = INITIAL_STATE, { vehicle, mode }) => ({
  ...state,
  [vehicle]: mode
});

// -- tie up the reducers to action types

const HANDLERS = {
  [Types.TOGGLE_BUS]: toggleBus,
  [Types.TOGGLE_TRAM]: toggleTram,
  [Types.TOGGLE_SUBWAY]: toggleSubway,
  [Types.TOGGLE_TRAIN]: toggleTrain,
  [Types.TOGGLE_FERRY]: toggleFerry,
  [Types.FILTERS_UPDATED]: updateFilters
};

export const reducer = createReducer(INITIAL_STATE, HANDLERS);