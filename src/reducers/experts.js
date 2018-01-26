import Immutable from 'seamless-immutable';
import Type from 'Actions/experts';

const initialState = Immutable({
    experts: [],
    experts_loaded_in_process: false,
    experts_loaded_error: false,
});

export default (state = initialState, action) => {
    switch (action.type) {
        case Type.EXPERTS_LOADED_IN_PROCESS:
            return state.merge({
                experts_loaded_in_process: true,
                experts_loaded_error: false
            });

        case Type.EXPERTS_LOADED_SUCCESS:
            return state.merge({
                experts: action.payload,
                experts_loaded_error: false,
                experts_loaded_in_process: false
            });

        case Type.EXPERTS_LOADED_ERROR:
            return state.merge({
                experts_loaded_error: true,
                experts_loaded_in_process: false
            });
        default:
            return state;
    }
}