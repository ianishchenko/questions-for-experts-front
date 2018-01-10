import React from 'react';

export default function (props) {
    return (
        <div className="row">
            {props.question.text}
        </div>
    );
}