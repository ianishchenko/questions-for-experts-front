import {Types} from 'Actions/loading';

const initialState = {
    in_progress: false
};

export default function loading(state = initialState, action) {
    switch (action.type) {
        case Types.IN_PROGRESS:
            return {
                in_progress: true
            };
        case Types.CLEAR:
            return {
                in_progress: false
            };
        default:
            return state;
    }
}