import React, {PureComponent} from "react";
import QuestionPreview from 'Components/question/QuestionPreview';

export default class QuestionsList extends PureComponent {
    render() {
        if (this.props.length === 0) {
            return <div>Questions list is empty</div>;
        }
        return (
            <ul>
                {this.props.questions.map(question => {
                    return <QuestionPreview key={question.id} question={question}/>
                })}
            </ul>
        );
    }
}