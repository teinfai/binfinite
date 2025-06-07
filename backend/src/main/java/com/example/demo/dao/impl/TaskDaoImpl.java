package com.example.demo.dao.impl;

import com.example.demo.dao.TaskDao;
import com.example.demo.entity.Task;
import com.example.demo.enums.TaskStatus;
import com.example.demo.mapper.TaskMapper;
import com.example.demo.repository.TaskRepo;
import com.example.demo.vo.TaskVo;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TaskDaoImpl implements TaskDao {

    private final TaskRepo taskRepo;
    private final TaskMapper taskMapper; // Add this


    TaskDaoImpl(
            TaskRepo taskRepo,
            TaskMapper taskMapper
    ) {
        this.taskRepo = taskRepo;
        this.taskMapper = taskMapper;
    }

    @Override
    public TaskVo createTask(Task entity) {

        Task saved =  taskRepo.save(entity);

        return taskMapper.entityToVo(saved);
    }

    @Override
    public Task findById(Long id) {
        return taskRepo.findById(id).orElse(null);
    }

    @Override
    public List<Task> findAll() {
        return taskRepo.findAll();
    }

    @Override
    public TaskVo updateTask(Task entity) {
        Task saved = taskRepo.save(entity);
        return taskMapper.entityToVo(saved);
    }

    @Override
    public void deleteById(Long id) {
        taskRepo.deleteById(id);
    }


}
