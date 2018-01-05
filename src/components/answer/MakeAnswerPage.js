import React from "react";
import {
    questionActions,
} from 'Actions/questions';
import {
    alertActions
} from 'Actions/alert';
import {connect} from 'react-redux';
import QuestionPreview from 'Components/question/QuestionPreview';
import NoMatchComponent from 'Components/errors/NoMatchComponent';
import AnswerForm from './AnswerForm';
import AxiosHelper from 'Helpers/AxiosHelper';

class MakeAnswerPage extends React.Component {
    componentWillMount() {
        this.props.loadQuestion(this.props.match.params.hash);
    }

    submitAnswer = (data) => {
        const axios = new AxiosHelper();
        const submittedData = {
            text: data,
            question_id: this.props.questions.id
        };
        return axios.setUrl(`/answers`).setMethod('POST').setData(submittedData)
            .request()
            .then((result) => {
                this.props.successAnswer('Your answer was sent!');
                this.props.history.replace({
                    pathname: '/'
                });
            }, (err) => {

            });
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
    const {questions} = store;

    return {
        questions: questions.questions,
        loading: questions.questions_loaded_from_api_in_process,
        errorFetching: questions.questions_loaded_from_api_error,

    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadQuestion: questionActions.loadUserQuestionByHashAction.bind(null, dispatch),
        successAnswer: alertActions.success.bind(null, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MakeAnswerPage);