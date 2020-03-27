import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function accountsReducer(state = initialState.accounts, action) {
  switch(action.type) {
    case types.LOAD_ACCOUNTS_SUCCESS:
      return {...state, list: action.accounts};
    default:
      return state;
  }
}