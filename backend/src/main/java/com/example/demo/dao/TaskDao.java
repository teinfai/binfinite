package com.example.demo.dao;

import com.example.demo.entity.Task;
import com.example.demo.vo.TaskVo;

import java.util.List;

public interface TaskDao {
    TaskVo createTask(Task task);
    Task findById(Long id);
    List<Task> findAll();
    TaskVo updateTask(Task entity);
    void deleteById(Long id);
}
