let Type = {
    ADDED_NEW_QUESTION: 'ADDED_NEW_QUESTION'
};

export default Type;

export const questionActions = {
    addNewQuestionAction
};

const addNewQuestionAction = (dispatch, question) => {
    return dispatch => {
        dispatch({
            type: Type.ADDED_NEW_QUESTION,
            question: question
        });
    }
};