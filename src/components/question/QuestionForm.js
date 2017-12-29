import React from "react";

export default class QuestionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({question: event.target.value});
        this.props.handleFormData({questionText: event.target.value});
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="question-form">Input your question</label>
                    <textarea  className="form-control" id="question-form" rows="4" value={this.state.question}
                              onChange={this.handleChange}
                    />
                </div>
            </form>
        );
    }
}