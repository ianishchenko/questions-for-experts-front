import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

export default () => (WrappedComponent) => {
    @connect(store => ({
        isLoggedIn: store.user.isLoggedIn,
    }))
    class AuthenticatedPage extends Component {

        static propTypes = {
            location: PropTypes.any,
            history: PropTypes.any,
            isLoggedIn: PropTypes.bool.isRequired,
        };

        componentWillMount() {
            this.checkAuth(this.props);
        }

        componentWillReceiveProps(nextProps) {
            if (nextProps.location.pathname !== this.props.location.pathname) {
                this.checkAuth(nextProps);
            }
        }

        checkAuth = (props) => {
            if (!props.isLoggedIn) {
                props.history.replace({
                    pathname: '/login',
                    state: {
                        from: props.location.pathname
                    }
                });
            }
        };

        render() {
            return (
                <WrappedComponent {...this.props}/>
            );
        }
    }

    return AuthenticatedPage;
};