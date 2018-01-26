import React, {Component} from 'react';
import {Link, Switch} from 'react-router-dom';
import Routes from './../../routes';
import {alertActions} from 'Actions/alert';
import {userActions} from 'Actions/user';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {history} from '../../store';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import {userService} from "Services/userService";
import Chat from 'Components/chat/Chatroom';
import PropTypes from 'prop-types';

class App extends Component {

    static propTypes = {
        clear: PropTypes.func,
        setUser: PropTypes.func,
        alert: PropTypes.object
    };

    shouldComponentUpdate(nextProps) {
        return nextProps.alert != this.props.alert;
    }

    render() {
        let isAuth = false;
        let user = null;
        if (userService.getIsAuth()) {
            user = userService.getCurrentUser();
            this.props.setUser(user);
            isAuth = true;
        }
        const {alert} = this.props;
        if (alert.type) {
            Alert[alert.type](alert.message, {
                position: 'bottom-right',
                effect: 'flip'
            });
        }
        history.listen((location, action) => {
            this.props.clear();
        });

        return (
            <div>
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                {isAuth && ([
                                    <li key="home"><Link key="home" to="/">Home</Link></li>,
                                    <li key="questions"><Link key="questions" to="/questions">My questions</Link></li>
                                ])}
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                {isAuth ? (
                                    <li><Link to="/logout">Logout</Link></li>
                                ) : ([
                                    <li key="registration">
                                        <Link to="/registration"><span className="glyphicon glyphicon-user"/>
                                            Sign Up
                                        </Link>
                                    </li>,
                                    <li key="login"><Link to="/login"><span className="glyphicon glyphicon-log-in"/>Login</Link>
                                    </li>
                                ])}
                            </ul>
                        </div>
                    </div>
                </nav>
                <header className="intro-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                                <div className="site-heading">
                                    <h1>Questions for experts</h1>
                                    <hr className="small"/>
                                    <span className="subheading">Yor find answer to anything</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <main>
                    <Switch>
                        {Routes}
                    </Switch>
                </main>
                {isAuth && <Chat user={user}/>}
                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                                <ul className="list-inline text-center">
                                    <li>
                                        <a href="https://github.com/ITwinkle/questions"/>
                                    </li>
                                </ul>
                                <p className="copyright text-muted">Copyright &copy; Questions 2017</p>
                            </div>
                        </div>
                    </div>
                </footer>
                <div>
                    <Alert stack={{limit: 3}} timeout={3000}/>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (store) => {
    const {alert} = store;
    return {
        alert
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clear: alertActions.clear.bind(null, dispatch),
        setUser: userActions.setUser.bind(null, dispatch)
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));