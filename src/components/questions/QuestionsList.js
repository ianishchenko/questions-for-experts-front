import React, {PureComponent} from "react";
import QuestionPreview from 'Components/question/QuestionPreview';
import AnswersList from 'Components/answer/AnswersList';
import PropTypes from 'prop-types';

export default class QuestionsList extends PureComponent {

    static propTypes = {
        questions: PropTypes.array.isRequired
    };

    render() {
        const {questions} = this.props;
        if (questions.length === 0) {
            return <div>Questions list is empty</div>;
        }
        return (
            <ul>
                {questions.map(question => {
                    return (
                        <div key={question.id}>
                            <h2>Question</h2>
                            <QuestionPreview question={question}/>
                            <h3 key="answer-header">Answer</h3>
                            <AnswersList answers={question.answers}/>
                            <hr/>
                            <br/>
                        </div>
                    )
                })}
            </ul>
        );
    }
}