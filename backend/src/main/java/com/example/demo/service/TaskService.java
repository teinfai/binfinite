package com.example.demo.service;

import com.example.demo.dto.TaskDto;
import com.example.demo.entity.Task;
import com.example.demo.vo.TaskVo;

import java.util.List;

public interface TaskService {
    TaskVo createTask(TaskDto taskDto);
    TaskVo getTaskById(Long id);
    List<TaskVo> getAllTasks();
    TaskVo updateTask(Long id, TaskDto dto);
    void deleteTask(Long id);
}
