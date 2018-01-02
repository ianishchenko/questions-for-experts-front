import React from 'react';
import {Link, Switch} from 'react-router-dom';
import Routes from './../../routes';
import {
    alertActions,
} from '../../actions/alert';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {history} from '../../store';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            this.props.clear();
        });
    }

    render() {
        const {alert} = this.props;
        if (Object.keys(alert).length !== 0) {
            Alert[alert.type](alert.message, {
                position: 'bottom-right',
                effect: 'flip'
            });
        }
        return (
            <div>
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/questions">My questions</Link></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/registration"><span className="glyphicon glyphicon-user"/> Sign Up</Link>
                                </li>
                                <li><Link to="/login"><span className="glyphicon glyphicon-log-in"/> Login</Link></li>
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
    const {alert} = store;
    return {
        alert
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clear: alertActions.clear.bind(null, dispatch)
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));