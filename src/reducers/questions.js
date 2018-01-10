import Type from 'Actions/questions';

const initialState = {
    questions: [],
    questions_loaded_from_api_in_process: false,
    questions_loaded_from_api_error: false,
    answer_change_in_process: false,
    answer_change_error: false
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
        case Type.ANSWER_CHANGE_IN_PROCESS:
            return {
                ...state,
                answer_change_in_process: true,
                answer_change_error: false
            };
        case Type.ANSWER_CHANGE_SUCCESS: {
            const newState = state.questions.map(question => {
                question.answers.map(answer => {
                    if (answer.id === action.payload.id) {
                        answer = action.payload;
                    }
                    return answer;
                });
                return question;
            });

            return {
                ...state,
                questions: newState,
                answer_change_in_process: false,
                answer_change_error: false
            }
        }
        case Type.ANSWER_CHANGE_ERROR:
            return {
                ...state,
                answer_change_in_process: false,
                answer_change_error: true
            };
        default:
            return state;
    }
}