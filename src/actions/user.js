import {userService} from '../services/userService';
import {alertActions} from './alert';
import {history} from '../store';
import {createTypes} from 'reduxsauce';

export const Types = createTypes(`
  LOGIN_REQUEST
  LOGIN_SUCCESS
  LOGIN_FAILURE
  LOGOUT
  REGISTER_REQUEST
  REGISTER_SUCCESS
  REGISTER_FAILURE
`);

export const userActions = {
    login,
    logout,
    setUser,
    register
};

function login(dispatch, {email, password}) {
    return (dispatch => {
        dispatch(request({email}));

        userService.login(email, password)
            .then(
                user => {
                    dispatch(success(user.user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    alertActions.error(dispatch, 'Fail login');
                }
            );
    })(dispatch);

    function request(user) {
        return {type: Types.LOGIN_REQUEST, user}
    }

    function success(user) {
        return {type: Types.LOGIN_SUCCESS, user}
    }

    function failure(error) {
        return {type: Types.LOGIN_FAILURE, error}
    }
}

function logout() {
    userService.logout();
    return {type: Types.LOGOUT};
}

function register(dispatch, user) {
    return ((dispatch) => {
        dispatch(request(user));

        return userService.register(user)
            .then(
                () => {
                    dispatch(success());
                    alertActions.success(dispatch, 'Registration successful');
                    history.push('/login');
                },
                error => {
                    dispatch(failure(error));
                    alertActions.error(dispatch, error);
                }
            );
    })(dispatch);

    function request(user) {
        return {type: Types.REGISTER_REQUEST, user}
    }

    function success(user) {
        return {type: Types.REGISTER_SUCCESS, user}
    }

    function failure(error) {
        return {type: Types.REGISTER_FAILURE, error}
    }
}

function setUser(dispatch, user) {
    return ((dispatch) => {
        dispatch(success(user));
    })(dispatch);

    function success(user) {
        return {type: Types.LOGIN_SUCCESS, user}
    }
}