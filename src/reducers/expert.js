import Type from '../actions/expert';

const initialState = {
    expert: {
        id: null,
        first_name: null,
        last_name: null,
        small_description: null,
        avatar: null,
        category_id: null,
        email: null
    },
    expert_loaded_from_api_in_process: false,
    expert_loaded_from_api_error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case Type.EXPERT_LOADED_FROM_API_IN_PROCESS:
            return {
                ...state,
                expert_loaded_from_api_in_process: true,
                expert_loaded_from_api_error: false
            };

        case Type.EXPERT_LOADED_FROM_API_SUCCESS:
            return {
                ...state,
                expert: action.payload,
                expert_loaded_from_api_error: false,
                expert_loaded_from_api_in_process: false
            };

        case Type.EXPERT_LOADED_FROM_API_ERROR:
            return {
                ...state,
                expert_loaded_from_api_error: true,
                expert_loaded_from_api_in_process: false
            };
        default:
            return state;
    }
}