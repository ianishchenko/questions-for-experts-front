import Immutable from 'seamless-immutable';
import Type from 'Actions/questions';

const initialState = Immutable({
    questions: [],
    questions_loaded_in_process: false,
    questions_loaded_error: false,
    answer_change_in_process: false,
    answer_change_error: false
});

export default (state = initialState, action) => {
    switch (action.type) {
        case Type.QUESTIONS_LOADED_IN_PROCESS:
            return state.merge({
                questions_loaded_in_process: true,
                questions_loaded_error: false
            });

        case Type.QUESTIONS_LOADED_SUCCESS:
            return state.merge({
                questions: action.payload,
                questions_loaded_error: false,
                questions_loaded_in_process: false
            });

        case Type.QUESTIONS_LOADED_ERROR:
            return state.merge({
                questions_loaded_error: true,
                questions_loaded_in_process: false
            });
        case Type.ADDED_NEW_QUESTION:
            return state.merge({
                questions: state.questions.concat(action.question)
            });
        case Type.ANSWER_CHANGE_IN_PROCESS:
            return state.merge({
                answer_change_in_process: true,
                answer_change_error: false
            });
        case Type.ANSWER_CHANGE_SUCCESS: {
            const newQuestionsState = state.questions.map(question => {
                question.answers.map(answer => {
                    if (answer.id === action.payload.id) {
                        answer = action.payload;
                    }
                    return answer;
                });
                return question;
            });

            return state.merge({
                questions: newQuestionsState,
                answer_change_in_process: false,
                answer_change_error: false
            })
        }
        case Type.ANSWER_CHANGE_ERROR:
            return state.merge({
                answer_change_in_process: false,
                answer_change_error: true
            });
        default:
            return state;
    }
}