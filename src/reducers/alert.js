import Immutable from 'seamless-immutable';
import {Types} from 'Actions/alert';

const InitialState = Immutable({
    type: '',
    message: ''
});

export default function alert(state = InitialState, action) {
    switch (action.type) {
        case Types.SUCCESS:
            return state.merge({
                type: 'success',
                message: action.message
            });
        case Types.ERROR:
            return state.merge({
                type: 'error',
                message: action.message
            });
        case Types.CLEAR:
            return {};
        default:
            return state;
    }
}