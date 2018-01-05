import React from 'react';
import {Link, Switch} from 'react-router-dom';
import Routes from './../../routes';
import {alertActions} from 'Actions/alert';
import {userActions} from 'Actions/user';
import {loading} from 'Actions/loading';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {history} from '../../store';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import {userService} from "Services/userService";

class App extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.alert != this.props.alert;
    }

    render() {
        let isAuth = false;
        if (userService.getIsAuth()) {
            this.props.setUser(userService.getCurrentUser());
            isAuth = true;
        }
        const {alert, loading} = this.props;
        if (Object.keys(alert).length !== 0) {
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
                                <li key="home"><Link key="home" to="/">Home</Link></li>
                                <li key="questions"><Link key="questions" to="/questions">My questions</Link></li>
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
                {loading.in_progress === true && <div className="loading">Loading...</div>}
                <main>
                    <Switch>
                        {Routes}
                    </Switch>
                </main>

                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                                <ul className="list-inline text-center">
                                    <li>
                                        <a href="https://github.com/ITwinkle/questions">
                                <span className="fa-stack fa-lg">
                                    <i className="fa fa-circle fa-stack-2x"/>
                                    <i className="fa fa-github fa-stack-1x fa-inverse"/>
                                </span>
                                        </a>
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
    const {alert, loading} = store;
    return {
        alert,
        loading
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clear: alertActions.clear.bind(null, dispatch),
        setUser: userActions.setUser.bind(null, dispatch),

    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));