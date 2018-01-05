import Type from 'Actions/category';

const initialState = {
    categories: [],
    categories_loaded_from_api_in_process: false,
    categories_loaded_from_api_error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case Type.CATEGORIES_LOADED_FROM_API_IN_PROCESS:
            return {
                ...state,
                categories_loaded_from_api_in_process: true
            };

        case Type.CATEGORIES_LOADED_FROM_API_SUCCESS:
            return {
                ...state,
                categories: action.payload
            };

        case Type.CATEGORIES_LOADED_FROM_API_ERROR:
            return {
                ...state,
                categories_loaded_from_api_error: true
            };
        default:
            return state;
    }
}