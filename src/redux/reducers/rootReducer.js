import { combineReducers } from 'redux';
import HotelDetailReducer from './hotelDetailReducer';
import CommonDataReducer from './commonDataReducer';

const rootReducer = combineReducers({
  common: CommonDataReducer,
  hotelDetail: HotelDetailReducer,
});

export default rootReducer;