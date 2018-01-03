import React from 'react';
import { Route } from 'react-router-dom';

import Home from './components/home/HomePage';
import Questions from './components/questions/QuestionsPage';
import Experts from './components/experts/ExpertsPage';
import Expert from './components/expert/ExpertPage';
import NoMatchComponent from './components/errors/NoMatchComponent';
import Registration from './components/auth/register/RegisterPage';
import Login from './components/auth/login/LoginPage';
import Logout from './components/logout/LogoutComponent';
import MageAnswerPage from './components/answer/MakeAnswerPage';

const routes = [
    <Route key="home" exact path="/" component={Home} />,
    <Route key="questions" exact path="/questions" component={Questions} />,
    <Route key="experts" exact path="/categories/:category_id/experts" component={Experts} />,
    <Route key="expert" exact path="/experts/:expert_id" component={Expert} />,
    <Route key="registration" exact path="/registration" component={Registration} />,
    <Route key="login" exact path="/login" component={Login} />,
    <Route key="logout" exact path="/logout" component={Logout} />,
    <Route key="make_answer" exact path="/answers/:hash" component={MageAnswerPage} />,
    <Route key="noMatch" component={NoMatchComponent}/>
];


export default routes;