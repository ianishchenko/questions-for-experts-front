import Type from 'Actions/experts';

const initialState = {
    experts: [],
    experts_loaded_from_api_in_process: false,
    experts_loaded_from_api_error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case Type.EXPERTS_LOADED_FROM_API_IN_PROCESS:
            return {
                ...state,
                experts_loaded_from_api_in_process: true,
                experts_loaded_from_api_error: false
            };

        case Type.EXPERTS_LOADED_FROM_API_SUCCESS:
            return {
                ...state,
                experts: action.payload,
                experts_loaded_from_api_error: false,
                experts_loaded_from_api_in_process: false
            };

        case Type.EXPERTS_LOADED_FROM_API_ERROR:
            return {
                ...state,
                experts_loaded_from_api_error: true,
                experts_loaded_from_api_in_process: false
            };
        default:
            return state;
    }
}