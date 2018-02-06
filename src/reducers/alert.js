import Immutable from 'seamless-immutable';
import {Types} from 'Actions/alert';
import {createReducer} from 'reduxsauce';

const INITIAL_STATE = Immutable({
    type: '',
    message: ''
});

const success = (state = INITIAL_STATE, action) => {
    return state.merge({
        type: 'success',
        message: action.message
    });
};

const error = (state = INITIAL_STATE, action) => {
    return state.merge({
        type: 'error',
        message: action.message
    });
};

const clear = (state = INITIAL_STATE, action) => {
    return INITIAL_STATE;
};

const HANDLERS = {
    [Types.SUCCESS]: success,
    [Types.ERROR]: error,
    [Types.CLEAR]: clear
};

export default createReducer(INITIAL_STATE, HANDLERS);