import { __ACTION_NAME_CONSTANT__ } from './constants';

export default function(state = {}, action) {
  switch (action.type) {
    case __ACTION_NAME_CONSTANT__:
      return action.payload;
    default:
      return state;
  }
}