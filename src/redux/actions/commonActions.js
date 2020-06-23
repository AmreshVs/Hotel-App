import { USER_LOGIN, SNACKBAR_MESSAGE, AUTO_OTP_HASH } from '../actionCreators/commonAC';

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

export const setAutoOtpHash = (payload) => {
  return {
    type: AUTO_OTP_HASH,
    payload
  };
};