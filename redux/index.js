import { combineReducers } from 'redux';

import configureStore from './CreateStore';
import rootSaga from '../sagas';
import { reducer } from './HslRedux';


export default () => {
  const rootReducer = combineReducers({
    hsl: reducer,
  });

  return configureStore(rootReducer, rootSaga);
};