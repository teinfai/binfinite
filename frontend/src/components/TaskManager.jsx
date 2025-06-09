import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Button, Form, Table, Container, Card, Badge, Row, Col } from 'react-bootstrap';

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
            <Card className="p-4 shadow-sm mb-4">
                <Card.Title>{editingId ? 'Update Task' : 'Add New Task'}</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Row className="g-2 mb-3">
                        <Col md>
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                            />
                        </Col>
                        <Col md>
                            <Form.Control
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                            />
                        </Col>
                        <Col xs="auto">
                            <Button type="submit" variant="primary">
                                {editingId ? 'Update' : 'Add'}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>

            <Card className="shadow-sm">
                <Card.Body>
                    <Card.Title>Task List</Card.Title>
                    <Table responsive bordered hover className="align-middle">
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
                                        <Badge bg={task.completed ? 'success' : 'secondary'}>
                                            {task.completed ? 'Completed' : 'Pending'}
                                        </Badge>
                                    </td>
                                    <td className="text-center">
                                        <Button
                                            variant="success"
                                            size="sm"
                                            onClick={() => toggleComplete(task)}
                                            className="me-2"
                                            disabled={task.completed}
                                        >
                                            Complete
                                        </Button>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            onClick={() => handleEdit(task)}
                                            className="me-2"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(task.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
}
