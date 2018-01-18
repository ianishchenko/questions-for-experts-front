import React, {Component} from "react";
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
import PropTypes from 'prop-types';

class MakeAnswerPage extends Component {

    static propTypes = {
        loadQuestion: PropTypes.func,
        successAnswer: PropTypes.func,
        question: PropTypes.any,
        loading: PropTypes.bool,
        errorFetching: PropTypes.bool
    };

    componentWillMount() {
        this.props.loadQuestion(this.props.match.params.hash);
    }

    submitAnswer = (data) => {
        const axios = new AxiosHelper();

        const submittedData = {
            text: data,
            question_id: this.props.question.id
        };
        return axios.setUrl(`/answers`).setMethod('POST').setData(submittedData)
            .request()
            .then((result) => {
                this.props.successAnswer('Your answer was sent!');
                setTimeout(() => {
                    this.props.history.replace({
                        pathname: '/'
                    });
                }, 2000);
            }, (err) => {

            });
    };

    render() {
        const {loading, question} = this.props;
        if (question === undefined) {
            return <NoMatchComponent/>
        }
        return (
            <div className="page container text-center">
                {loading === true && <div className="loading">Loading...</div>}
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
        question: questions.questions,
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