// Not Used
import {USER_LOGIN} from '../actionCreators/commonAC';

const initialState = {
  userData: {},
};

const CommonDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return Object.assign({}, state, {userData: action.payload});
    default:
      return state;
  }
};

export default CommonDataReducer;
