import api from './api';

class TaskService {
    async getAllTasks() {
        const response = await api.get('/listAll');
        return response.data;
    }

    async createTask(taskData) {
        const response = await api.post('/createTask', {
            ...taskData,
            completed: false
        });
        return response.data;
    }

    async updateTask(id, taskData) {
        const response = await api.put(`/updateTask/${id}`, taskData);
        return response.data;
    }

    async deleteTask(id) {
        const response = await api.delete(`/${id}`);
        return response.data;
    }

    async markAsCompleted(task) {
        return this.updateTask(task.id, {
            ...task,
            completed: true
        });
    }
}

export default new TaskService();
