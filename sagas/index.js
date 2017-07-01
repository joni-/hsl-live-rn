import { takeLatest, all } from 'redux-saga/effects';

import { HslTypes } from '../redux/HslRedux';
import { startStreaming } from './HslSagas';


export default function* root() {
  yield all([
    takeLatest(HslTypes.START, startStreaming),
  ]);
}