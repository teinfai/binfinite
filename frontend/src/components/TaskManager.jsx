import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
    Button,
    Form,
    Table,
    Container,
    Card,
    Badge,
    Row,
    Col,
    Stack
} from 'react-bootstrap';
import { BsCheckCircle, BsHourglassSplit, BsPencil, BsTrash } from 'react-icons/bs';

export default function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const fetchTasks = async () => {
        const res = await api.get('/listAll');
        setTasks(res.data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingId) {
            await api.put(`/updateTask/${editingId}`, { title, description, completed });
            setEditingId(null);
        } else {
            await api.post('/createTask', { title, description, completed: false });
        }

        setTitle('');
        setDescription('');
        setCompleted(false);
        fetchTasks();
    };

    const handleEdit = (task) => {
        setTitle(task.title);
        setDescription(task.description);
        setCompleted(task.completed);
        setEditingId(task.id);
    };

    const handleDelete = async (id) => {
        await api.delete(`/${id}`);
        fetchTasks();
    };

    const toggleComplete = async (task) => {
        if (task.completed) return;
        await api.put(`/updateTask/${task.id}`, {
            title: task.title,
            description: task.description,
            completed: true
        });
        fetchTasks();
    };

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4 fw-bold">📝 Task Manager</h2>
            <Row className="g-4">
                <Col md={4}>
                    <Card className="shadow-sm p-3">
                        <Card.Title className="mb-3">
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
                            <Button type="submit" variant="primary" className="w-100">
                                {editingId ? 'Update Task' : 'Add Task'}
                            </Button>
                        </Form>
                    </Card>
                </Col>

                <Col md={8}>
                    <Card className="shadow-sm p-3">
                        <Card.Title className="mb-3">📋 Task List</Card.Title>
                        {tasks.length === 0 ? (
                            <p className="text-muted text-center">No tasks found. Add some!</p>
                        ) : (
                            <Table bordered responsive hover className="align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map(task => (
                                        <tr key={task.id}>
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
                                                    >
                                                        ✅
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline-warning"
                                                        onClick={() => handleEdit(task)}
                                                    >
                                                        <BsPencil />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline-danger"
                                                        onClick={() => handleDelete(task.id)}
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
        </Container>
    );
}
