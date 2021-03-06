import {alertActions} from 'Actions/alert';
import AxiosHelper from 'Helpers/AxiosHelper';
import {createTypes} from 'reduxsauce';

export const Types = createTypes(`
  ADDED_NEW_QUESTION
  QUESTIONS_LOADED_IN_PROCESS
  QUESTIONS_LOADED_SUCCESS
  QUESTIONS_LOADED_ERROR
  ANSWER_CHANGE_IN_PROCESS
  ANSWER_CHANGE_SUCCESS
  ANSWER_CHANGE_ERROR
`);

export const questionActions = {
    changeAnswerAction,
    addNewQuestionAction,
    loadUserQuestionsAction,
    loadUserQuestionByHashAction
};

function addNewQuestionAction(dispatch, question) {
    return (dispatch => {
        dispatch({
            type: Types.ADDED_NEW_QUESTION,
            question: question
        });
        alertActions.success(dispatch, 'Question was added successfully');
    })(dispatch);
}

function loadUserQuestionsAction(dispatch, userId) {
    return ((dispatch) => {
        dispatch({
            type: Types.QUESTIONS_LOADED_IN_PROCESS
        });
        const axios = new AxiosHelper();
        return axios.setUrl(`/users/${userId}/questions`)
            .request()
            .then((result) => {
                return dispatch(
                    {
                        type: Types.QUESTIONS_LOADED_SUCCESS,
                        payload: result.data
                    }
                );
            }, (err) => dispatch({
                type: Types.QUESTIONS_LOADED_ERROR
            }));
    })(dispatch);
}

function loadUserQuestionByHashAction(dispatch, hash) {
    return ((dispatch) => {
        dispatch({
            type: Types.QUESTIONS_LOADED_IN_PROCESS
        });
        const axios = new AxiosHelper();
        return axios.setUrl(`/answers/${hash}`)
            .request()
            .then((result) => {
                return dispatch(
                    {
                        type: Types.QUESTIONS_LOADED_SUCCESS,
                        payload: result.data
                    }
                );
            }, (err) => dispatch({
                type: Types.QUESTIONS_LOADED_ERROR
            }))
    })(dispatch);
}

function changeAnswerAction(dispatch, answer) {
    return ((dispatch) => {
        dispatch({
            type: Types.ANSWER_CHANGE_IN_PROCESS
        });

        const axios = new AxiosHelper();
        return axios.setUrl(`/answers/${answer.id}`).setMethod('PUT').setData(answer)
            .request()
            .then((result) => {
                alertActions.success(dispatch, 'Your score was added!');
                return dispatch(
                    {
                        type: Types.ANSWER_CHANGE_SUCCESS,
                        payload: result.data
                    }
                );
            }, (err) => dispatch({
                type: Types.ANSWER_CHANGE_ERROR
            }));
    })(dispatch);
}