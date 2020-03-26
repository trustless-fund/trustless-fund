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