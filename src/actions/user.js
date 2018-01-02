import { userService } from '../services/userService';
import { alertActions } from './alert';
import { history } from '../store';

export  const Types = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT',
    REGISTER_REQUEST: 'REGISTER_REQUEST',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAILURE: 'REGISTER_FAILURE'
};

export const userActions = {
    login,
    logout,
    register
};

function login(dispatch, {email, password}) {
    return (dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => {
                    dispatch(success(user.user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    })(dispatch);

    function request(user) { return { type: Types.LOGIN_REQUEST, user } }
    function success(user) { return { type: Types.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: Types.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: Types.LOGOUT };
}

function register(dispatch, user) {
    return ((dispatch) => {
        dispatch(request(user));

        return userService.register(user)
            .then(
                () => {
                    dispatch(success());
                    history.push('/login');
                    alertActions.success(dispatch, 'Registration successful');
                },
                error => {
                    dispatch(failure(error));
                    alertActions.error(dispatch, error);
                }
            );
    })(dispatch);

    function request(user) { return { type: Types.REGISTER_REQUEST, user } }
    function success(user) { return { type: Types.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: Types.REGISTER_FAILURE, error } }
}