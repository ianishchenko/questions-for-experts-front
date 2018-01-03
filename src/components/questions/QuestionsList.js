import React from 'react';
import QuestionPreview from '../question/QuestionPreview';

export default function QuestionsList(props) {
    if (props.length === 0) {
        return <div>Questions list is empty</div>;
    }
    return (
        <ul>
            {props.questions.map(question => {
                return <QuestionPreview key={question.id} question={question}/>
            })}
        </ul>
    );
}