import Immutable from 'seamless-immutable';
import {Types} from 'Actions/category';
import {createReducer} from 'reduxsauce';

const INITIAL_STATE = Immutable({
    categories: [],
    categories_loaded_in_process: false,
    categories_loaded_error: false,
});

const success = (state = INITIAL_STATE, action) => {
    return state.merge({
        categories: action.payload,
        categories_loaded_in_process: false
    });
};

const error = (state = INITIAL_STATE, action) => {
    return state.merge({
        categories_loaded_error: true
    });
};

const inProgress = (state = INITIAL_STATE, action) => {
    return state.merge({
        categories_loaded_in_process: true
    });
};

const HANDLERS = {
    [Types.CATEGORIES_LOADED_SUCCESS]: success,
    [Types.CATEGORIES_LOADED_ERROR]: error,
    [Types.CATEGORIES_LOADED_IN_PROCESS]: inProgress
};

export default createReducer(INITIAL_STATE, HANDLERS);