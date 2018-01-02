import React from "react";
import {connect} from 'react-redux';
import Modal from '../modal/Modal';
import QuestionForm from '../question/QuestionForm';
import AxiosHelper from '../../helpers/AxiosHelper';
import {questionActions} from '../../actions/questions';
import {alertActions} from '../../actions/alert';

class NewQuestion extends React.Component {
    state = {
        questionModalIsOpen: false,
        questionText: ''
    };

    toggleModal = () => {
        this.setState((prevState, props) => ({
            questionModalIsOpen: !prevState.questionModalIsOpen
        }));
    };

    handleFormData = (text) => {
        this.setState(text)
    };

    sendQuestion = () => {
        const axios = new AxiosHelper();
        const data = {
            text: this.state.questionText,
            category_id: this.props.category,
            expert_id: this.props.expert_id
        };
        return axios.setUrl(`/questions`).setMethod('POST').setData(data)
            .request()
            .then((result) => {
                this.props.addNewQuestion(result);
                this.toggleModal();
            }, (err) => {
                this.props.failAdding(err);
                this.toggleModal();
            });
    };

    render() {
        return (
            <div>
                <div className="btn bg-success" onClick={this.toggleModal}>Ask me something</div>
                <Modal isOpen={this.state.questionModalIsOpen} handleModalCloseRequest={this.toggleModal}
                       handleModalConfirmRequest={this.sendQuestion}>
                    <QuestionForm handleFormData={this.handleFormData}/>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addNewQuestion: questionActions.addNewQuestionAction.bind(null, dispatch),
        failAdding: alertActions.error.bind(null, dispatch)
    }
};
export default connect(null, mapDispatchToProps)(NewQuestion);