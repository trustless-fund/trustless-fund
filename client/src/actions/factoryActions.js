import factoryConnect from '../connect/factory';
import * as types from './actionTypes';

export function loadFactory() {
  return (dispatch) => {
    return factoryConnect.getFactory().then(factory => {
      dispatch(loadFactorySuccess(factory));
    }).catch(err => {
      throw(err);
    });
  }
}

export function loadFactorySuccess(factory) {
  return {type: types.LOAD_FACTORY_SUCCESS, factory};
}

export function loadFundAddress(fundId) {
  return (dispatch) => {
    return factoryConnect.getFundAddress(fundId).then(fundAddress => {
      dispatch(loadFundAddressSuccess(fundAddress));
    }).catch(err => {
      throw(err);
    });
  }
}

export function loadFundAddressSuccess(fundAddress) {
  return {type: types.LOAD_FUND_ADDRESS_SUCCESS, fundAddress};
}