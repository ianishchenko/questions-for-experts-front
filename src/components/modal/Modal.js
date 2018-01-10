import React, {Component} from 'react';
import Modal from 'react-modal';
import './index.css';
import PropTypes from 'prop-types';

export default class ModalComponent extends Component {

    static propTypes = {
        handleModalCloseRequest: PropTypes.func,
        handleModalConfirmRequest: PropTypes.func,
        isOpen: PropTypes.bool,
        children: PropTypes.element
    };

    render() {
        return (
            <Modal
                className="Modal__Bootstrap modal-dialog"
                isOpen={this.props.isOpen}
                ariaHideApp={false}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={this.props.handleModalCloseRequest}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        <h4 className="modal-title">{this.props.modalTitle}</h4>
                    </div>
                    <div className="modal-body">
                        {this.props.children}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={this.props.handleModalCloseRequest}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={this.props.handleModalConfirmRequest}>Send question</button>
                    </div>
                </div>
            </Modal>
        );
    }
}