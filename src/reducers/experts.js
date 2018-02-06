import Immutable from 'seamless-immutable';
import {Types} from 'Actions/experts';
import {createReducer} from 'reduxsauce';

const INITIAL_STATE = Immutable({
    experts: [],
    experts_loaded_in_process: false,
    experts_loaded_error: false,
});

const success = (state = INITIAL_STATE, action) => {
    return state.merge({
        experts: action.payload,
        experts_loaded_error: false,
        experts_loaded_in_process: false
    });
};

const error = (state = INITIAL_STATE, action) => {
    return state.merge({
        experts_loaded_error: true,
        experts_loaded_in_process: false
    });
};

const inProgress = (state = INITIAL_STATE, action) => {
    return state.merge({
        experts_loaded_in_process: true,
        experts_loaded_error: false
    });
};

const HANDLERS = {
    [Types.EXPERTS_LOADED_SUCCESS]: success,
    [Types.EXPERTS_LOADED_ERROR]: error,
    [Types.EXPERTS_LOADED_IN_PROCESS]: inProgress
};

export default createReducer(INITIAL_STATE, HANDLERS);