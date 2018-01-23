import { FETCH_USER } from '../actions/index';

const INITIAL_STATE = { data: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type){
        case FETCH_USER:
        return { ...state, data: action.payload.data };
        default:
        return state;
  }
} // fetch user and store it on data.data
