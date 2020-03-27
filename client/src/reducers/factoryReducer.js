import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function factoryReducer(state = initialState.factory, action) {
  switch(action.type) {
    case types.LOAD_FACTORY_SUCCESS:
      return {...state, instance: action.factory};
    case types.LOAD_FUND_ADDRESS_SUCCESS:
      return {...state, fundAddress: action.fundAddress};
    default:
      return state;
  }
}