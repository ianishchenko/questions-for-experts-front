import React, {PureComponent} from 'react';
import AnswerPreview from './AnswerPreview';
import PropTypes from 'prop-types';

export default class AnswersList extends PureComponent {

    static propTypes = {
        answers: PropTypes.array
    };

    render() {
        const {answers} = this.props;

        if (!answers) {
            return 'No answers yet!';
        }
        return (
            <div>
                {answers.map(answer => {
                    return <AnswerPreview key={answer.id} answer={answer}/>
                })}
            </div>
        );
    }
}