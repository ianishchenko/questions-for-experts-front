import React, {Component} from "react";
import {connect} from 'react-redux';
import Modal from 'Components/modal/Modal';
import QuestionForm from 'Components/question/QuestionForm';
import AxiosHelper from 'Helpers/AxiosHelper';
import {questionActions} from 'Actions/questions';
import {alertActions} from 'Actions/alert';
import PropTypes from 'prop-types';

class NewQuestion extends Component {

    static propTypes = {
        addNewQuestion: PropTypes.func,
        failAdding: PropTypes.func,
        author_id: PropTypes.number,
        expert_id: PropTypes.number
    };

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

        const {questionText} = this.state;
        const {category, expert_id, author_id} = this.props;

        const data = {
            text: questionText,
            category_id: category,
            expert_id: expert_id,
            author_id: author_id
        };
        return axios.setUrl(`/questions`).setMethod('POST').setData(data)
            .request()
            .then((result) => {
                this.props.addNewQuestion(result.data);
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

const mapStateToProps = (store) => {
    return {
        author_id: store.user.user.id
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addNewQuestion: questionActions.addNewQuestionAction.bind(null, dispatch),
        failAdding: alertActions.error.bind(null, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);