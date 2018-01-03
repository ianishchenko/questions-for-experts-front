import React from "react";
import {
    questionActions,
} from '../../actions/questions';
import {connect} from 'react-redux';
import {userService} from '../../services/userService';
import QuestionsList from './QuestionsList';

class QuestionsPage extends React.Component {

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