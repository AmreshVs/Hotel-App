import { USER_LOGIN, SNACKBAR_MESSAGE } from '../actionCreators/commonAC';

export const userLogin = (payload) => {
  return {
    type: USER_LOGIN,
    payload
  };
};

export const snackMessage = (payload) => {
  return {
    type: SNACKBAR_MESSAGE,
    payload
  };
};