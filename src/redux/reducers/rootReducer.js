import { combineReducers } from 'redux';
import initialAppState from './initialAppState';
import HotelDetailReducer from './hotelDetailReducer';
import CommonDataReducer from './commonDataReducer';

const rootReducer = combineReducers({
  initialState: initialAppState,
  common: CommonDataReducer,
  hotelDetail: HotelDetailReducer,
});

export default rootReducer;