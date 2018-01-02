import React from "react";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import validator from 'validator';

const required = (value) => {
    if (!value.toString().trim().length) {
        return 'required';
    }
};

const email = (value) => {
    if (!validator.isEmail(value)) {
        return `${value} is not a valid email.`
    }
};

export default class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

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
        try {
            return (
                <Form ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Input  className="form-control" name="email" id="email" onChange={this.handleChange} value={this.state.email} validations={[required, email]}/>
                        <label htmlFor="pass">Password</label>
                        <Input  className="form-control" type="password" name="password" id="pass" onChange={this.handleChange} value={this.state.pass} validations={[required]}/>
                    </div>
                    <Button className="btn btn-primary">Register user</Button>
                </Form>
            );
        } catch (e){

        }

    }
}