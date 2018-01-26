import Immutable from 'seamless-immutable';
import Type from 'Actions/expert';

const initialState = Immutable({
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

export default (state = initialState, action) => {
    switch (action.type) {
        case Type.EXPERT_LOADED_IN_PROCESS:
            return state.merge({
                expert_loaded_in_process: true,
                expert_loaded_error: false
            });

        case Type.EXPERT_LOADED_SUCCESS:
            return state.merge({
                expert: state.expert.merge(action.payload),
                expert_loaded_error: false,
                expert_loaded_in_process: false
            });

        case Type.EXPERT_LOADED_ERROR:
            return state.merge({
                expert_loaded_error: true,
                expert_loaded_in_process: false
            });
        default:
            return state;
    }
}