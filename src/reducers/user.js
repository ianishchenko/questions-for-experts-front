import { Types } from '../actions/user';

const initialState = {
    user: null,
    user_from_api_in_process: false,
    user_from_api_error: false
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case Types.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.user,
                user_from_api_error: false,
                user_from_api_in_process: false
            };
        case Types.LOGIN_REQUEST:
            return {
                ...state,
                user_from_api_in_process: true,
                user_from_api_error: false
            };
        case Types.LOGIN_FAILURE:
            return {
                ...state,
                user_from_api_in_process: false,
                user_from_api_error: true

            };
        default:
            return state
    }
}