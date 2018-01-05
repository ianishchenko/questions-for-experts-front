import React,{PureComponent} from "react";
import {
    questionActions,
} from 'Actions/questions';
import {connect} from 'react-redux';
import {userService} from 'Services/userService';
import QuestionsList from './QuestionsList';
import authenticatedPageDecorator from 'Decorators/authenticatedPage';

@authenticatedPageDecorator()
class QuestionsPage extends PureComponent {

    componentWillMount(){
        this.props.loadQuestions(userService.getCurrentUser()['id']);
    }

    render() {
        const questions = this.props.questions;
        return (
            <div className="text-center">
                <QuestionsList questions={questions}/>
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
        loadQuestions: questionActions.loadUserQuestionsAction.bind(null, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(QuestionsPage);