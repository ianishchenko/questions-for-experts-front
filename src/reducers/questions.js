import Type from '../actions/questions';

const initialState = {
    questions: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case Type.ADDED_NEW_QUESTION:
            return {
                ...state,
                questions: [...state.questions, action.question]
            };
        default:
            return state;
    }
}