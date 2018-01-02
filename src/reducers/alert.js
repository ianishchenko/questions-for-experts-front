import { Types } from '../actions/alert';

export default function alert(state = {}, action) {
    switch (action.type) {
        case Types.SUCCESS:
            return {
                type: 'success',
                message: action.message
            };
        case Types.ERROR:
            return {
                type: 'error',
                message: action.message
            };
        case Types.CLEAR:
            return {};
        default:
            return state;
    }
}