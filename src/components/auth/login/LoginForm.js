import React, {Component} from "react";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import PropTypes from 'prop-types';

const required = (value) => {
    if (!value.toString().trim().length) {
        return 'required';
    }
};

export default class LoginForm extends Component {

    static propTypes = {
        handleSubmit: PropTypes.func
    };

    state = {
        email: '',
        password: ''
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.handleSubmit(data);
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {password, email} = this.state;
        return (
            <Form ref={c => { this.form = c }} onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Input  className="form-control" name="email" id="email" onChange={this.handleChange} value={email} validations={[required]}/>
                    <label htmlFor="pass">Password</label>
                    <Input  className="form-control" type="password" name="password" id="pass" onChange={this.handleChange} value={password} validations={[required]}/>
                </div>
                <Button className="btn btn-primary">Login</Button>
            </Form>
        );
    }
}