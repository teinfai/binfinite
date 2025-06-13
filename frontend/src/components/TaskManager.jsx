import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
    Button, Form, Table, Container, Card,
    Badge, Row, Col, Stack
} from 'react-bootstrap';
import { BsCheckCircle, BsHourglassSplit, BsPencil, BsTrash } from 'react-icons/bs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteConfirmationModal from './DeleteConfirmationModal';

export default function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const fetchTasks = async () => {
        try {
            const res = await api.get('/listAll');
            setTasks(res.data);
        } catch (err) {
            toast.error("Failed to fetch tasks");
        }
    };

    useEffect(() => {
        // run once
        fetchTasks();
    }, []);

    const handleSubmit = async (e) => {
        // onhandle
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/updateTask/${editingId}`, { title, description, completed });
                toast.success("Task updated");
                setEditingId(null);
            } else {
                await api.post('/createTask', { title, description, completed: false });
                toast.success("Task added");
            }

            setTitle('');
            setDescription('');
            setCompleted(false);
            fetchTasks();
        } catch (err) {
            toast.error("Operation failed");
        }
    };

    const handleEdit = (task) => {
        setTitle(task.title);
        setDescription(task.description);
        setCompleted(task.completed);
        setEditingId(task.id);
    };

    const confirmDelete = (task) => {
        setTaskToDelete(task);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirmed = async () => {
        try {
            await api.delete(`/${taskToDelete.id}`);
            toast.success("Task deleted");
            fetchTasks();
        } catch (err) {
            toast.error("Delete failed");
        }
        setShowDeleteModal(false);
        setTaskToDelete(null);
    };

    const toggleComplete = async (task) => {
        if (task.completed) return;
        try {
            await api.put(`/updateTask/${task.id}`, {
                title: task.title,
                description: task.description,
                completed: true
            });
            toast.success("Task marked as completed");
            fetchTasks();
        } catch (err) {
            toast.error("Update failed");
        }
    };

    return (
        <Container className="my-5">
            <ToastContainer position="top-center" autoClose={2000} />
            <h2 className="text-center mb-4 fw-bold" style={{
                color: '#2c3e50',
                fontSize: '2.5rem',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}>📝 Task Manager</h2>
            <Row className="g-4">
                <Col md={4}>
                    <Card className="shadow-sm p-3" style={{
                        borderRadius: '15px',
                        border: 'none',
                        backgroundColor: '#f8f9fa'
                    }}>
                        <Card.Title className="mb-3" style={{ color: '#2c3e50' }}>
                            {editingId ? '✏️ Edit Task' : '➕ Add Task'}
                        </Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="Enter task title"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    placeholder="Enter task description"
                                    required
                                />
                            </Form.Group>
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-100"
                                style={{
                                    borderRadius: '10px',
                                    padding: '10px',
                                    fontWeight: '600',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {editingId ? 'Update Task' : 'Add Task'}
                            </Button>
                        </Form>
                    </Card>
                </Col>

                <Col md={8}>
                    <Card className="shadow-sm p-3" style={{
                        borderRadius: '15px',
                        border: 'none',
                        backgroundColor: '#f8f9fa'
                    }}>
                        <Card.Title className="mb-3" style={{ color: '#2c3e50' }}>
                            📋 Task List
                        </Card.Title>
                        {tasks.length === 0 ? (
                            <p className="text-muted text-center">No tasks found. Add some!</p>
                        ) : (
                            <Table bordered hover className="align-middle" style={{
                                borderRadius: '10px',
                                overflow: 'hidden'
                            }}>
                                <thead style={{ backgroundColor: '#e9ecef' }}>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map(task => (
                                        <tr key={task.id} style={{
                                            transition: 'all 0.2s ease',
                                            backgroundColor: task.completed ? '#f8fff8' : 'white'
                                        }}>
                                            <td>{task.title}</td>
                                            <td>{task.description}</td>
                                            <td>
                                                <Badge bg={task.completed ? 'success' : 'warning'}>
                                                    {task.completed ? (
                                                        <BsCheckCircle className="me-1" />
                                                    ) : (
                                                        <BsHourglassSplit className="me-1" />
                                                    )}
                                                    {task.completed ? 'Completed' : 'Pending'}
                                                </Badge>
                                            </td>
                                            <td className="text-center">
                                                <Stack direction="horizontal" gap={2} className="justify-content-center">
                                                    <Button
                                                        size="sm"
                                                        variant="success"
                                                        onClick={() => toggleComplete(task)}
                                                        disabled={task.completed}
                                                        style={{
                                                            borderRadius: '8px',
                                                            transition: 'all 0.2s ease'
                                                        }}
                                                    >
                                                        ✅
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline-warning"
                                                        onClick={() => handleEdit(task)}
                                                        style={{
                                                            borderRadius: '8px',
                                                            transition: 'all 0.2s ease'
                                                        }}
                                                    >
                                                        <BsPencil />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline-danger"
                                                        onClick={() => confirmDelete(task)}
                                                        style={{
                                                            borderRadius: '8px',
                                                            transition: 'all 0.2s ease'
                                                        }}
                                                    >
                                                        <BsTrash />
                                                    </Button>
                                                </Stack>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Card>
                </Col>
            </Row>

            <DeleteConfirmationModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirmed}
                task={taskToDelete}
            />
        </Container>
    );
}
