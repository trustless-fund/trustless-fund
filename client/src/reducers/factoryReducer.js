import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function factoryReducer(state = initialState.factory, action) {
  switch(action.type) {
    case types.LOAD_FACTORY_SUCCESS:
      return action.factory;
    default:
      return state;
  }
}