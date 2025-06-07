// src/components/TaskManager.jsx

import React, { useEffect, useState } from 'react';
import api from '../services/api';   // your axios instance with baseURL='/api/task'
import { Button, Form, Table } from 'react-bootstrap';

export default function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    // ✅ completed is a boolean, default to false
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
            // Update an existing task: keep its completed flag
            await api.put(`/updateTask/${editingId}`, {
                title,
                description,
                completed
            });
            setEditingId(null);
        } else {
            // Create a new task: always start as not completed
            await api.post('/createTask', {
                title,
                description,
                completed: false
            });
        }

        // Reset form fields
        setTitle('');
        setDescription('');
        setCompleted(false);

        // Refresh the list
        fetchTasks();
    };

    const handleEdit = (task) => {
        // Load task into form for editing
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
        if (task.completed) {
            return; // already completed
        }
        await api.put(`/updateTask/${task.id}`, {
            title: task.title,
            description: task.description,
            completed: true
        });
        fetchTasks();
    };

    return (
        <div>
            <Form onSubmit={handleSubmit} className="mb-4">
                <Form.Group className="mb-2">
                    <Form.Control
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Control
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="primary">
                    {editingId ? 'Update Task' : 'Add Task'}
                </Button>
            </Form>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Completed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.completed ? 'COMPLETED' : 'PENDING'}</td>
                            <td>
                                <Button
                                    variant="success"
                                    size="sm"
                                    onClick={() => toggleComplete(task)}
                                    className="me-2"
                                    disabled={task.completed}
                                >
                                    Toggle Complete
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
        </div>
    );
}
