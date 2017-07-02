import { combineReducers } from 'redux';

import configureStore from './CreateStore';
import rootSaga from '../sagas';
import { reducer } from './HslRedux';
import { reducer as filterReducer } from './FilterRedux';


export default () => {
  const rootReducer = combineReducers({
    hsl: reducer,
    filters: filterReducer
  });

  return configureStore(rootReducer, rootSaga);
};