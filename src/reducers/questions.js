import Immutable from 'seamless-immutable';
import {Types} from 'Actions/questions';
import {createReducer} from 'reduxsauce';

const INITIAL_STATE = Immutable({
    questions: [],
    questions_loaded_in_process: false,
    questions_loaded_error: false,
    answer_change_in_process: false,
    answer_change_error: false
});

const questionSuccess = (state = INITIAL_STATE, action) => {
    return state.merge({
        questions: action.payload,
        questions_loaded_error: false,
        questions_loaded_in_process: false
    });
};

const questionError = (state = INITIAL_STATE, action) => {
    return state.merge({
        questions_loaded_error: true,
        questions_loaded_in_process: false
    });
};

const questionInProgress = (state = INITIAL_STATE, action) => {
    return state.merge({
        questions_loaded_in_process: true,
        questions_loaded_error: false
    });
};

const newQuestionAdded = (state = INITIAL_STATE, action) => {
    return state.merge({
        questions: state.questions.concat(action.question)
    });
};

const answerSuccess = (state = INITIAL_STATE, action) => {
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
    });
};

const answerError = (state = INITIAL_STATE, action) => {
    return state.merge({
        answer_change_in_process: false,
        answer_change_error: true
    });
};

const answerInProgress = (state = INITIAL_STATE, action) => {
    return state.merge({
        answer_change_in_process: true,
        answer_change_error: false
    });
};

const HANDLERS = {
    [Types.QUESTIONS_LOADED_SUCCESS]: questionSuccess,
    [Types.QUESTIONS_LOADED_ERROR]: questionError,
    [Types.QUESTIONS_LOADED_IN_PROCESS]: questionInProgress,
    [Types.ADDED_NEW_QUESTION]: newQuestionAdded,
    [Types.ANSWER_CHANGE_SUCCESS]: answerSuccess,
    [Types.ANSWER_CHANGE_ERROR]: answerError,
    [Types.ANSWER_CHANGE_IN_PROCESS]: answerInProgress
};

export default createReducer(INITIAL_STATE, HANDLERS);