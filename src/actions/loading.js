export const Types = {
    IN_PROGRESS: 'IN_PROGRESS',
    CLEAR: 'CLEAR'
};

export const loadingActions = {
    inProgress,
    clear
};

function inProgress(dispatch, message) {
    return ((dispatch) => {
        dispatch({
            type: Types.IN_PROGRESS, message
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