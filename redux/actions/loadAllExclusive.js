import {
  LOAD_EXROOMS_DATA_PENDING,
  LOAD_EXROOMS_DATA_SUCCESS,
  LOAD_EXROOMS_DATA_ERROR,
} from '../actionCreators/exclusiveRoomsAC';

export const loadExRoomsDataPending = payload => {
  return {
    type: LOAD_EXROOMS_DATA_PENDING,
    payload,
  };
};

export const loadExRoomsDataSuccess = payload => {
  return {
    type: LOAD_EXROOMS_DATA_SUCCESS,
    payload,
  };
};

export const loadExRoomsDataError = payload => {
  return {
    type: LOAD_EXROOMS_DATA_ERROR,
    payload,
  };
};
