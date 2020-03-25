import {combineReducers} from 'redux';
import accounts from './accountsReducer';

const rootReducer = combineReducers({
  accounts
});

export default rootReducer;