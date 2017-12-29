import React from "react";
import LoginForm from './LoginForm';
import {
    userActions,
} from '../../../actions/user';
import {connect} from 'react-redux';

class LoginPage extends React.Component {

    constructor(props){
        super(props);

        this.login = this.login.bind(this);
    }

    login(data){
        this.props.login(data);
    }

    render() {
        return (
            <div className="text-center">
                <div className="row">
                    <div className="col-md-push-4 col-md-4">
                        <LoginForm handleSubmit={this.login}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: userActions.login.bind(null, dispatch),
    }
};
export default connect(null, mapDispatchToProps)(LoginPage);