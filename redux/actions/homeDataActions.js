import {
  LOAD_HOME_DATA_PENDING,
  LOAD_HOME_DATA_SUCCESS,
  LOAD_HOME_DATA_ERROR,
} from '../actionCreators/homeDataAC';

export const loadHomeDataPending = payload => {
  return {
    type: LOAD_HOME_DATA_PENDING,
    payload,
  };
};

export const loadHomeDataSuccess = payload => {
  return {
    type: LOAD_HOME_DATA_SUCCESS,
    payload,
  };
};

export const loadHomeDataError = payload => {
  return {
    type: LOAD_HOME_DATA_ERROR,
    payload,
  };
};
