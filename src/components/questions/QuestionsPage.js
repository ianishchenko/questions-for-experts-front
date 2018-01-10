import React, {PureComponent} from "react";
import {
    questionActions,
} from 'Actions/questions';
import {connect} from 'react-redux';
import {userService} from 'Services/userService';
import QuestionsList from './QuestionsList';
import authenticatedPageDecorator from 'Decorators/authenticatedPage';
import PropTypes from 'prop-types';

@authenticatedPageDecorator()
class QuestionsPage extends PureComponent {

    static propTypes = {
        loadQuestions: PropTypes.func,
        questions: PropTypes.array,
        loading: PropTypes.bool,
        errorFetching: PropTypes.bool
    };

    componentWillMount() {
        this.props.loadQuestions(userService.getCurrentUser()['id']);
    }

    render() {
        const {questions, loading} = this.props;
        return (
            <div className="page container text-left">
                {loading === true && <div className="loading">Loading...</div>}
                <QuestionsList questions={questions}/>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    const {questions} = store;
    return {
        questions: questions.questions,
        loading: questions.questions_loaded_from_api_in_process,
        errorFetching: questions.questions_loaded_from_api_error
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadQuestions: questionActions.loadUserQuestionsAction.bind(null, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(QuestionsPage);