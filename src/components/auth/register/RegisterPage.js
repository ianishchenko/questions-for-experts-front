import React from "react";
import RegistrationForm from './RegistrationForm';
import {
    userActions,
} from '../../../actions/user';
import {connect} from 'react-redux';

class RegisterPage extends React.Component {

    constructor(props) {
        super(props);
        this.sendRegistrationData = this.sendRegistrationData.bind(this)
    }

    sendRegistrationData(data) {
        this.props.register(data);
    }

    render() {
        return (
            <div className="text-center">
                <div className="row">
                    <div className="col-md-push-4 col-md-4">
                        <RegistrationForm handleSubmit={this.sendRegistrationData}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        register: userActions.register.bind(null, dispatch)
    }
};

export default connect(null, mapDispatchToProps)(RegisterPage);