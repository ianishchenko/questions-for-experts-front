export const Types = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    CLEAR: 'CLEAR'
};

export const alertActions = {
    success,
    error,
    clear
};

function success(dispatch, message) {
    return ((dispatch) => {
        dispatch({
            type: Types.SUCCESS, message
        });
    })(dispatch);
}

function error(dispatch, message) {
    return ((dispatch) => {
        dispatch({
            type: Types.ERROR, message
        });
    })(dispatch);
}

function clear(dispatch) {
    return ((dispatch) => {
        dispatch({
            type: Types.CLEAR
        });
    })(dispatch);
}