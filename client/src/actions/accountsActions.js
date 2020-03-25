import accountsConnect from '../connect/accounts';
import * as types from './actionTypes';

export function loadAccounts() {
  return (dispatch) => {
    return accountsConnect.getAccounts().then(accounts => {
      dispatch(loadAccountsSuccess(accounts));
    }).catch(err => {
      throw(err);
    });
  }
}

export function loadAccountsSuccess(accounts) {
  return {type: types.LOAD_ACCOUNTS_SUCCESS, accounts};
}