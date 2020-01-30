import { USER_LOGIN, SNACKBAR_MESSAGE } from '../actionCreators/commonAC';

const initialState = {
    userData: {},
    snackbar: { visible: false, message: ''},
};

const CommonDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return Object.assign({}, state, { userData: action.payload });
        case SNACKBAR_MESSAGE:
            return Object.assign({}, state, { snackbar: action.payload });
        default:
            return state;
    }
};

export default CommonDataReducer;