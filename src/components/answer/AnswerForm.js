import React, {PureComponent} from "react";
import PropTypes from 'prop-types';

export default class AnswerForm extends PureComponent {

    static propTypes = {
        submitAnswer: PropTypes.func
    };

    state = {
        answer: ''
    };

    handleChange = (event) => {
        this.setState({answer: event.target.value});
    };

    submit = (event) => {
        event.preventDefault();
        this.props.submitAnswer(this.state.answer)
    };

    render() {
        return (
            <form onSubmit={this.submit}>
                <div className="form-group">
                    <label htmlFor="question-form">Make your answer</label>
                    <textarea  className="form-control" id="answer-form" rows="10" value={this.state.answer}
                              onChange={this.handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}