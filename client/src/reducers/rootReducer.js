import {combineReducers} from 'redux';
import accounts from './accountsReducer';
import factory from './factoryReducer';

const rootReducer = combineReducers({
  accounts,
  factory
});

export default rootReducer;