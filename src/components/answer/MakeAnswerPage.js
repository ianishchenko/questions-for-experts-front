import React from "react";
import {
    questionActions,
} from '../../actions/questions';
import {connect} from 'react-redux';
import QuestionPreview from '../question/QuestionPreview';
import NoMatchComponent from '../errors/NoMatchComponent';
import AnswerForm from './AnswerForm';

class MakeAnswerPage extends React.Component {
    componentWillMount() {
        this.props.loadQuestion(this.props.match.params.hash);
    }

    submitAnswer = (data) => {
        console.log(data);
    };

    render() {
        const question = this.props.questions;
        if (question === undefined) {
            return <NoMatchComponent/>
        }
        return (
            <div className="text-center">
                <div className="h1">Question is:</div>
                <QuestionPreview question={question}/>
                <div className="col-md-push-4 col-md-4">
                    <AnswerForm submitAnswer={this.submitAnswer}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        questions: store.questions.questions,
        loading: store.questions.questions_loaded_from_api_in_process,
        errorFetching: store.questions.questions_loaded_from_api_error
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadQuestion: questionActions.loadUserQuestionByHashAction.bind(null, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MakeAnswerPage);