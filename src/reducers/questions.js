import Type from 'Actions/questions';

const initialState = {
    questions: [],
    questions_loaded_from_api_in_process: false,
    questions_loaded_from_api_error: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case Type.QUESTIONS_LOADED_FROM_API_IN_PROCESS:
            return {
                ...state,
                questions_loaded_from_api_in_process: true,
                questions_loaded_from_api_error: false
            };

        case Type.QUESTIONS_LOADED_FROM_API_SUCCESS:
            return {
                ...state,
                questions: action.payload,
                questions_loaded_from_api_error: false,
                questions_loaded_from_api_in_process: false
            };

        case Type.QUESTIONS_LOADED_FROM_API_ERROR:
            return {
                ...state,
                questions_loaded_from_api_error: true,
                questions_loaded_from_api_in_process: false
            };
        case Type.ADDED_NEW_QUESTION:
            return {
                ...state,
                questions: [...state.questions, action.question]
            };
        default:
            return state;
    }
}