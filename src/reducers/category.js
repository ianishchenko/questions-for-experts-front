import Immutable from 'seamless-immutable';
import Type from 'Actions/category';

const initialState = Immutable({
    categories: [],
    categories_loaded_in_process: false,
    categories_loaded_error: false,
});

export default (state = initialState, action) => {
    switch (action.type) {
        case Type.CATEGORIES_LOADED_IN_PROCESS:
            return state.merge({
                categories_loaded_in_process: true
            });

        case Type.CATEGORIES_LOADED_SUCCESS:
            return state.merge({
                categories: action.payload,
                categories_loaded_in_process: false
            });

        case Type.CATEGORIES_LOADED_ERROR:
            return state.merge({
                categories_loaded_error: true
            });
        default:
            return state;
    }
}