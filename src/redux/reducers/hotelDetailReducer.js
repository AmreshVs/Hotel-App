import { OPEN_IMAGE_VIEWER, CLOSE_IMAGE_VIEWER, LOAD_PRICES } from '../actionCreators/hotelDetailAC';
import { ADD_GUESTS, REMOVE_GUESTS, ADD_FOODS, REMOVE_FOODS, ADD_SERVICES, REMOVE_SERVICES } from '../actionCreators/hotelDetailAC';
import { CHOOSE_DATES, SAVE_REVIEW, SERVICE_CHECKED, HOTEL_IDS, COUPONS } from '../actionCreators/hotelDetailAC';
import { LOAD_HOTELDETAILS_DATA_PENDING, LOAD_HOTELDETAILS_DATA_SUCCESS, LOAD_HOTELDETAILS_DATA_ERROR, CLEAR_DATA } from '../actionCreators/hotelDetailAC';
import moment from 'moment';

function parseDate(input) {
  var parts = input.match(/(\d+)/g);
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

const initialState = {
  showImageViewer: false,
  dates: { startDate: parseDate(moment().format()), endDate: parseDate(moment().add(1, 'days').format()) },
  rooms: { 1: { adult: 1, children: 0 } },
  foods: {},
  save_review: null,
  prices_services: null,
  services: [],
  serviceChecked: [],
  hotelIds: [],
  coupons: '',
};

const HotelDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_IMAGE_VIEWER:
      return Object.assign({}, state, { showImageViewer: true });
    case CLOSE_IMAGE_VIEWER:
      return Object.assign({}, state, { showImageViewer: false });
    case ADD_GUESTS:
      return Object.assign({}, state, { rooms: action.roomsArr });
    case REMOVE_GUESTS:
      return Object.assign({}, state, { rooms: action.payload });
    case ADD_FOODS:
      return Object.assign({}, state, { foods: action.foodsArr });
    case REMOVE_FOODS:
      return Object.assign({}, state, { foods: action.foodsArr });
    case CHOOSE_DATES:
      return Object.assign({}, state, { dates: action.payload.dates });
    case LOAD_HOTELDETAILS_DATA_PENDING:
      return Object.assign({}, state, { pending: true });
    case LOAD_HOTELDETAILS_DATA_SUCCESS:
      return Object.assign({}, state, { pending: false, hotelDetail: action.payload });
    case LOAD_HOTELDETAILS_DATA_ERROR:
      return Object.assign({}, state, { pending: false, error: true });
    case CLEAR_DATA:
      return Object.assign({}, state, { pending: true, prices_services: [], services: [], serviceChecked: [], hotelIds: [], coupons: '', foods: {} });
    case SAVE_REVIEW:
      return Object.assign({}, state, { save_review: action.payload });
    case LOAD_PRICES:
      return Object.assign({}, state, { prices_services: action.payload });
    case ADD_SERVICES:
      return Object.assign({}, state, { services: action.servicesArr });
    case REMOVE_SERVICES:
      return Object.assign({}, state, { services: action.payload });
    case SERVICE_CHECKED:
      return Object.assign({}, state, { serviceChecked: action.payload });
    case HOTEL_IDS:
      return Object.assign({}, state, { hotelIds: action.payload });
    case COUPONS:
      return Object.assign({}, state, { coupons: action.payload });
    default:
      return state;
  }
};

export default HotelDetailReducer;