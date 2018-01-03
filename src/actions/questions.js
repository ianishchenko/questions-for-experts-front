import { alertActions } from './alert';
import AxiosHelper from '../helpers/AxiosHelper';

let Type = {
    ADDED_NEW_QUESTION: 'ADDED_NEW_QUESTION',
    QUESTIONS_LOADED_FROM_API_IN_PROCESS: 'QUESTIONS_LOADED_FROM_API_IN_PROCESS',
    QUESTIONS_LOADED_FROM_API_SUCCESS: 'QUESTIONS_LOADED_FROM_API_SUCCESS',
    QUESTIONS_LOADED_FROM_API_ERROR: 'QUESTIONS_LOADED_FROM_API_ERROR'
};

export default Type;

export const questionActions = {
    addNewQuestionAction,
    loadUserQuestionsAction,
    loadUserQuestionByHashAction
};

function addNewQuestionAction(dispatch, question) {
    return (dispatch => {
        dispatch({
            type: Type.ADDED_NEW_QUESTION,
            question: question
        });
        alertActions.success(dispatch, 'Question added successfully');
    })(dispatch);
}

function loadUserQuestionsAction(dispatch, userId) {
    return ((dispatch) => {
        dispatch({
            type: Type.QUESTIONS_LOADED_FROM_API_IN_PROCESS
        });
        const axios = new AxiosHelper();
        return axios.setUrl(`/users/${userId}/questions`)
            .request()
            .then((result) => {
                return dispatch(
                    {
                        type: Type.QUESTIONS_LOADED_FROM_API_SUCCESS,
                        payload: result.data
                    }
                );
            }, (err) => dispatch({
                type: Type.QUESTIONS_LOADED_FROM_API_ERROR
            }))
    })(dispatch);
}

function loadUserQuestionByHashAction(dispatch, hash) {
    return ((dispatch) => {
        dispatch({
            type: Type.QUESTIONS_LOADED_FROM_API_IN_PROCESS
        });
        const axios = new AxiosHelper();
        return axios.setUrl(`/answers/${hash}`)
            .request()
            .then((result) => {
                return dispatch(
                    {
                        type: Type.QUESTIONS_LOADED_FROM_API_SUCCESS,
                        payload: result.data
                    }
                );
            }, (err) => dispatch({
                type: Type.QUESTIONS_LOADED_FROM_API_ERROR
            }))
    })(dispatch);
}