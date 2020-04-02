// Not Used
import { LOAD_HOME_DATA_PENDING, LOAD_HOME_DATA_SUCCESS, LOAD_HOME_DATA_ERROR } from '../actionCreators/homeDataAC';

const initialState = {
  pending: false,
  homeData: [],
  error: null
};

const HomeDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_HOME_DATA_PENDING:
      return Object.assign({}, state, { pending: true });
    case LOAD_HOME_DATA_SUCCESS:
      return Object.assign({}, state, { pending: false, homeData: action.payload });
    case LOAD_HOME_DATA_ERROR:
      return Object.assign({}, state, { pending: false, error: null });
    default:
      return state;
  }
};

export default HomeDataReducer;