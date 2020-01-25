import { USER_LOGIN } from '../actionCreators/commonAC';

export const userLogin = (payload) => {
  return {
    type: USER_LOGIN,
    payload
  };
};