package com.example.demo.service.impl;

import com.example.demo.dao.TaskDao;
import com.example.demo.dto.TaskDto;
import com.example.demo.entity.Task;
import com.example.demo.mapper.TaskMapper;
import com.example.demo.repository.TaskRepo;
import com.example.demo.service.TaskService;
import com.example.demo.vo.TaskVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class TaskServiceImpl implements TaskService {

    private final TaskDao taskDao;
    private final TaskMapper taskMapper;
    private static final Logger log = LoggerFactory.getLogger(TaskServiceImpl.class);

    TaskServiceImpl(
            TaskDao taskDao,
            TaskMapper taskMapper
    ) {
        this.taskDao = taskDao;
        this.taskMapper = taskMapper;
    }

    @Transactional
    public TaskVo createTask(TaskDto task) {
        log.debug("Creating task with title={}", task.getTitle());
        Task entity = taskMapper.dtoToEntity(task);
        TaskVo returnResponse = taskDao.createTask(entity);
        return returnResponse;
    }

    @Override
    @Transactional(readOnly = true)
    public TaskVo getTaskById(Long id) {
        Task entity = taskDao.findById(id);
        return (entity != null) ? taskMapper.entityToVo(entity) : null;
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskVo> getAllTasks() {
        return taskDao.findAll()
                .stream()
                .map(taskMapper::entityToVo)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public TaskVo updateTask(Long id, TaskDto dto) {
        Task existing = taskDao.findById(id);
        if (existing == null) {
            return null;
        }
        // copy fields from dto onto existing
        Task toSave = taskMapper.dtoToEntity(dto);
        toSave.setId(existing.getId()); // ensure ID stays the same
        return taskDao.updateTask(toSave);
    }

    @Override
    @Transactional
    public void deleteTask(Long id) {
        taskDao.deleteById(id);
    }


}
