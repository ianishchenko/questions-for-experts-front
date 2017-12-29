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

function success(message) {
    return { type: Types.SUCCESS, message };
}

function error(message) {
    return { type: Types.ERROR, message };
}

function clear() {
    return { type: Types.CLEAR };
}