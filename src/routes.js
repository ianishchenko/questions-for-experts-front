import React from 'react';
import { Route } from 'react-router-dom';

import Home from 'Components/home/HomePage';
import Questions from 'Components/questions/QuestionsPage';
import Experts from 'Components/experts/ExpertsPage';
import Expert from 'Components/expert/ExpertPage';
import NoMatchComponent from 'Components/errors/NoMatchComponent';
import Registration from 'Components/auth/register/RegisterPage';
import Login from 'Components/auth/login/LoginPage';
import Logout from 'Components/logout/LogoutComponent';
import MakeAnswerPage from 'Components/answer/MakeAnswerPage';

const routes = [
    <Route key="home" exact path="/" component={Home} />,
    <Route key="questions" exact path="/questions" component={Questions} />,
    <Route key="experts" exact path="/categories/:category_id/experts" component={Experts} />,
    <Route key="expert" exact path="/experts/:expert_id" component={Expert} />,
    <Route key="registration" exact path="/registration" component={Registration} />,
    <Route key="login" exact path="/login" component={Login} />,
    <Route key="logout" exact path="/logout" component={Logout} />,
    <Route key="make_answer" exact path="/answers/:hash" component={MakeAnswerPage} />,
    <Route key="noMatch" component={NoMatchComponent}/>
];


export default routes;