// Not Used
import { LOAD_EXROOMS_DATA_ERROR, LOAD_EXROOMS_DATA_PENDING, LOAD_EXROOMS_DATA_SUCCESS } from '../actionCreators/exclusiveRoomsAC';

const initialState = {
    pending: false,
    data: [],
    error: null
};

const ExclusiveRoomsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_EXROOMS_DATA_PENDING:
            return Object.assign({}, state, { pending: true });
        case LOAD_EXROOMS_DATA_SUCCESS:
            return Object.assign({}, state, { pending: false, data: action.payload });
        case LOAD_EXROOMS_DATA_ERROR:
            return Object.assign({}, state, { pending: false, error: null });
        default:
            return state;
    }
};

export default ExclusiveRoomsReducer;