import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../styles/main.scss';

const DeleteConfirmationModal = ({ show, onHide, onConfirm, task }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            backdrop="static"
            className="delete-confirmation-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    🗑️ Confirm Deletion
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete the task{' '}
                    <strong>{task?.title}</strong>?</p>
                <p>
                    This action cannot be undone.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={onHide}
                >
                    Cancel
                </Button>
                <Button
                    variant="danger"
                    onClick={onConfirm}
                >
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteConfirmationModal;
