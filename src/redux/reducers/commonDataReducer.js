import { USER_LOGIN, SNACKBAR_MESSAGE, AUTO_OTP_HASH } from '../actionCreators/commonAC';

const initialState = {
  userData: {},
  snackbar: { visible: false, message: '' },
  autoOtpHash: ''
};

const CommonDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return Object.assign({}, state, { userData: action.payload });
    case SNACKBAR_MESSAGE:
      return Object.assign({}, state, { snackbar: action.payload });
    case AUTO_OTP_HASH:
      return { ...state, autoOtpHash: action.payload };
    default:
      return state;
  }
};

export default CommonDataReducer;