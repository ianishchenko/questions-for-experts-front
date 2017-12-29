import React from "react";
import {connect} from 'react-redux';
import Modal from '../modal/Modal';
import QuestionForm from '../question/QuestionForm';
import AxiosHelper from '../../helpers/AxiosHelper';

class NewQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {questionModalIsOpen: false, questionText: ''};
        this.toggleModal = this.toggleModal.bind(this);
        this.handleFormData = this.handleFormData.bind(this);
        this.sendQuestion = this.sendQuestion.bind(this);
    }

    toggleModal() {
        this.setState((prevState, props) => ({
            questionModalIsOpen: !prevState.questionModalIsOpen
        }));
    }

    handleFormData(text) {
        this.setState(text)
    }

    sendQuestion() {
        const axios = new AxiosHelper();
        const data = {
            text: this.state.questionText,
            category_id: this.props.category,
            expert_id: this.props.expert_id
        };
        return axios.setUrl(`/questions`).setMethod('POST').setData(data)
            .request()
            .then((result) => {
                this.toggleModal();
            }, (err) => {
                this.toggleModal();
            });
    }

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
    return {};
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};
export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);