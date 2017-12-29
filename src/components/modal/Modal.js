import React from 'react';
import Modal from 'react-modal';
import './index.css';

class ModalComponent extends React.Component {
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

export default ModalComponent;