import { takeLatest, all } from 'redux-saga/effects';

import { HslTypes } from '../redux/HslRedux';
import { FilterTypes } from '../redux/FilterRedux';
import {
  startStreaming,
  toggleBus,
  toggleTram,
  toggleSubway,
  toggleTrain,
  toggleFerry
} from './HslSagas';


export default function* root() {
  yield all([
    takeLatest(HslTypes.START, startStreaming),
    takeLatest(FilterTypes.TOGGLE_BUS, toggleBus),
    takeLatest(FilterTypes.TOGGLE_TRAM, toggleTram),
    takeLatest(FilterTypes.TOGGLE_SUBWAY, toggleSubway),
    takeLatest(FilterTypes.TOGGLE_TRAIN, toggleTrain),
    takeLatest(FilterTypes.TOGGLE_FERRY, toggleFerry)
  ]);
}