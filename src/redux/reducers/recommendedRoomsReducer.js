// Not Used
import { LOAD_RC_DATA_PENDING, LOAD_RC_DATA_SUCCESS, LOAD_RC_DATA_ERROR } from '../actionCreators/recommendedRoomsAC';

const initialState = {
    pending: false,
    data: [],
    error: null
};

const RecommendedRoomsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_RC_DATA_PENDING:
            return Object.assign({}, state, { pending: true });
        case LOAD_RC_DATA_SUCCESS:
            return Object.assign({}, state, { pending: false, data: action.payload });
        case LOAD_RC_DATA_ERROR:
            return Object.assign({}, state, { pending: false, error: null });
        default:
            return state;
    }
};

export default RecommendedRoomsReducer;