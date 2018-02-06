import Immutable from 'seamless-immutable';
import {Types} from 'Actions/user';
import {createReducer} from 'reduxsauce';

const INITIAL_STATE = Immutable({
    user: null,
    user_in_process: false,
    user_error: false,
    isLoggedIn: false
});

const success = (state = INITIAL_STATE, action) => {
    return state.merge({
        user: action.user,
        isLoggedIn: true,
        user_error: false,
        user_in_process: false
    });
};

const error = (state = INITIAL_STATE, action) => {
    return state.merge({
        user_in_process: false,
        user_error: true,
        isLoggedIn: false

    });
};

const inProgress = (state = INITIAL_STATE, action) => {
    return state.merge({
        user_in_process: true,
        user_error: false
    });
};

const HANDLERS = {
    [Types.LOGIN_SUCCESS]: success,
    [Types.LOGIN_FAILURE]: error,
    [Types.LOGIN_REQUEST]: inProgress
};

export default createReducer(INITIAL_STATE, HANDLERS);