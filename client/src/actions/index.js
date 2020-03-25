import connect from '../connect';
import * as types from './actionTypes';

export function loadAccounts() {
  return (dispatch) => {
    return connect.getAccounts().then(accounts => {
      dispatch(loadAccountsSuccess(accounts));
    }).catch(err => {
      throw(err);
    });
  }
}

export function loadAccountsSuccess(accounts) {
  return {type: types.LOAD_ACCOUNTS_SUCCESS, accounts};
}