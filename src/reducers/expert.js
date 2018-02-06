import Immutable from 'seamless-immutable';
import {Types} from 'Actions/expert';
import {createReducer} from 'reduxsauce';

const INITIAL_STATE = Immutable({
    expert: {
        id: null,
        first_name: null,
        last_name: null,
        small_description: null,
        avatar: null,
        category_id: null,
        email: null
    },
    expert_loaded_in_process: false,
    expert_loaded_error: false,
});

const success = (state = INITIAL_STATE, action) => {
    return state.merge({
        expert: state.expert.merge(action.payload),
        expert_loaded_error: false,
        expert_loaded_in_process: false
    });
};

const error = (state = INITIAL_STATE, action) => {
    return state.merge({
        expert_loaded_error: true,
        expert_loaded_in_process: false
    });
};

const inProgress = (state = INITIAL_STATE, action) => {
    return state.merge({
        expert_loaded_in_process: true,
        expert_loaded_error: false
    });
};

const HANDLERS = {
    [Types.EXPERT_LOADED_SUCCESS]: success,
    [Types.EXPERT_LOADED_ERROR]: error,
    [Types.EXPERT_LOADED_IN_PROCESS]: inProgress
};

export default createReducer(INITIAL_STATE, HANDLERS);