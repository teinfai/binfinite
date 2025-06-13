import React, { useEffect, useState, useMemo, useCallback } from 'react';
import TaskService from '../services/TaskService';
import {
    Button, Form, Table, Container, Card,
    Badge, Row, Col, Stack
} from 'react-bootstrap';
import { BsCheckCircle, BsHourglassSplit, BsPencil, BsTrash } from 'react-icons/bs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import '../styles/main.scss';

export default function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    // Memoize fetch tasks callback
    const fetchTasks = useCallback(async () => {
        try {
            const data = await TaskService.getAllTasks();
            setTasks(data);
        } catch (err) {
            toast.error("Failed to fetch tasks");
        }
    }, []);

    useEffect(() => {
        // run once
        fetchTasks();
    }, [fetchTasks]);

    // Memoize handlers
    const handleSubmit = useCallback(async (e) => {
        // onhandle
        e.preventDefault();
        try {
            if (editingId) {
                await TaskService.updateTask(editingId, { title, description, completed });
                toast.success("Task updated");
                setEditingId(null);
            } else {
                await TaskService.createTask({ title, description });
                toast.success("Task added");
            }

            setTitle('');
            setDescription('');
            setCompleted(false);
            fetchTasks();
        } catch (err) {
            toast.error("Operation failed");
        }
    }, [title, description, completed, editingId, fetchTasks]);

    const handleEdit = useCallback((task) => {
        setTitle(task.title);
        setDescription(task.description);
        setCompleted(task.completed);
        setEditingId(task.id);
    }, []);

    const confirmDelete = (task) => {
        setTaskToDelete(task);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirmed = useCallback(async () => {
        try {
            await TaskService.deleteTask(taskToDelete.id);
            toast.success("Task deleted");
            fetchTasks();
        } catch (err) {
            toast.error("Delete failed");
        }
        setShowDeleteModal(false);
        setTaskToDelete(null);
    }, [taskToDelete, fetchTasks]);

    const toggleComplete = useCallback(async (task) => {
        if (task.completed) return;
        try {
            await TaskService.markAsCompleted(task);
            toast.success("Task marked as completed");
            fetchTasks();
        } catch (err) {
            toast.error("Update failed");
        }
    }, [fetchTasks]);

    // Memoize task lists
    const pendingTasks = useMemo(() => {
        return tasks.filter(task => !task.completed);
    }, [tasks]);

    const completedTasks = useMemo(() => {
        return tasks.filter(task => task.completed);
    }, [tasks]);

    // Memoize form section
    const taskForm = useMemo(() => (
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
                className="task-manager__submit-btn w-100"
            >
                {editingId ? 'Update Task' : 'Add Task'}
            </Button>
        </Form>
    ), [title, description, editingId, handleSubmit]);

    // Memoize table rows
    const taskRows = useMemo(() => (
        tasks.map(task => (
            <tr key={task.id} className={`task-manager__table-row ${task.completed ? 'task-manager__table-row--completed' : ''}`}>
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
                            className="task-manager__action-btn"
                        >
                            ✅
                        </Button>
                        <Button
                            size="sm"
                            variant="outline-warning"
                            onClick={() => handleEdit(task)}
                            className="task-manager__action-btn"
                        >
                            <BsPencil />
                        </Button>
                        <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => confirmDelete(task)}
                            className="task-manager__action-btn"
                        >
                            <BsTrash />
                        </Button>
                    </Stack>
                </td>
            </tr>
        ))
    ), [tasks, toggleComplete, handleEdit]);

    return (
        <Container className="my-5">
            <ToastContainer position="top-center" autoClose={2000} />
            <h2 className="task-manager__title">📝 Task Manager</h2>
            <Row className="g-4">
                <Col md={4}>
                    <Card className="task-manager__card shadow-sm p-3">
                        <Card.Title className="task-manager__card-title">
                            {editingId ? '✏️ Edit Task' : '➕ Add Task'}
                        </Card.Title>
                        {taskForm}
                    </Card>
                </Col>

                <Col md={8}>
                    <Card className="task-manager__card shadow-sm p-3">
                        <Card.Title className="task-manager__card-title">
                            📋 Task List
                        </Card.Title>
                        {tasks.length === 0 ? (
                            <p className="task-manager__card--no-tasks text-muted">No tasks found. Add some!</p>
                        ) : (
                            <Table bordered hover className="task-manager__table align-middle">
                                <thead className="task-manager__table-head">
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {taskRows}
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
