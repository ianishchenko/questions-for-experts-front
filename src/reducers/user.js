import Immutable from 'seamless-immutable';
import {Types} from 'Actions/user';

const initialState = Immutable({
    user: null,
    user_in_process: false,
    user_error: false,
    isLoggedIn: false
});

export default function user(state = initialState, action) {
    switch (action.type) {
        case Types.LOGIN_SUCCESS:
            return state.merge({
                user: action.user,
                isLoggedIn: true,
                user_error: false,
                user_in_process: false
            });
        case Types.LOGIN_REQUEST:
            return state.merge({
                user_in_process: true,
                user_error: false
            });
        case Types.LOGIN_FAILURE:
            return state.merge({
                user_in_process: false,
                user_error: true,
                isLoggedIn: false

            });
        default:
            return state
    }
}