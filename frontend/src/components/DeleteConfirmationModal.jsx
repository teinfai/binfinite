import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const DeleteConfirmationModal = ({ show, onHide, onConfirm, task }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            backdrop="static"
            style={{
                animation: 'fadeIn 0.3s ease'
            }}
        >
            <Modal.Header
                closeButton
                style={{
                    border: 'none',
                    backgroundColor: '#f8f9fa',
                    borderTopLeftRadius: '15px',
                    borderTopRightRadius: '15px'
                }}
            >
                <Modal.Title style={{
                    color: '#dc3545',
                    fontSize: '1.5rem',
                    fontWeight: '600'
                }}>
                    🗑️ Confirm Deletion
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{
                padding: '2rem',
                backgroundColor: '#f8f9fa',
                fontSize: '1.1rem'
            }}>
                <p>Are you sure you want to delete the task{' '}
                    <strong style={{ color: '#dc3545' }}>{task?.title}</strong>?</p>
                <p style={{
                    fontSize: '0.9rem',
                    color: '#6c757d',
                    marginTop: '1rem'
                }}>
                    This action cannot be undone.
                </p>
            </Modal.Body>
            <Modal.Footer style={{
                border: 'none',
                backgroundColor: '#f8f9fa',
                borderBottomLeftRadius: '15px',
                borderBottomRightRadius: '15px',
                padding: '1rem 2rem'
            }}>
                <Button
                    variant="secondary"
                    onClick={onHide}
                    style={{
                        borderRadius: '10px',
                        padding: '0.5rem 1.5rem',
                        transition: 'all 0.2s ease'
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="danger"
                    onClick={onConfirm}
                    style={{
                        borderRadius: '10px',
                        padding: '0.5rem 1.5rem',
                        marginLeft: '1rem',
                        transition: 'all 0.2s ease'
                    }}
                >
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteConfirmationModal;
