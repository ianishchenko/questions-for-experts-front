import { Types } from 'Actions/user';

const initialState = {
    user: null,
    user_from_api_in_process: false,
    user_from_api_error: false,
    isLoggedIn: false
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case Types.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.user,
                isLoggedIn: true,
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
                user_from_api_error: true,
                isLoggedIn: false

            };
        default:
            return state
    }
}