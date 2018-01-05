import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import questions from './questions';
import category from './category';
import experts from './experts';
import loading from './loading';
import expert from './expert';
import alert from './alert';
import user from './user';

export default combineReducers({
    routing: routerReducer,
    questions,
    category,
    experts,
    loading,
    expert,
    alert,
    user
});