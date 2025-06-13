package com.example.demo.service.impl;

import com.example.demo.dao.TaskDao;
import com.example.demo.dto.TaskDto;
import com.example.demo.entity.Task;
import com.example.demo.mapper.TaskMapper;
import com.example.demo.service.TaskService;
import com.example.demo.vo.TaskVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class TaskServiceImpl implements TaskService {

    private final TaskDao taskDao;
    private final TaskMapper taskMapper;

    public TaskServiceImpl(
            TaskDao taskDao,
            TaskMapper taskMapper
    ) {
        this.taskDao = taskDao;
        this.taskMapper = taskMapper;
    }

    @Override
    @Transactional
    public TaskVo createTask(TaskDto dto) {
        log.debug(">> createTask(dto={})", dto);
        // ensure status default
        dto.setCompleted(false);
        Task entity = taskMapper.dtoToEntity(dto);
        TaskVo vo = taskDao.createTask(entity);
        log.info("<< createTask created id={}, title={}", vo.getId(), vo.getTitle());
        return vo;
    }

    @Override
    @Transactional(readOnly = true)
    public TaskVo getTaskById(Long id) {
        log.debug(">> getTaskById(id={})", id);
        Task entity = taskDao.findById(id);
        if (entity == null) {
            log.warn("<< getTaskById: no task found for id={}", id);
            return null;
        }
        TaskVo vo = taskMapper.entityToVo(entity);
        log.info("<< getTaskById found {}", vo);
        return vo;
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskVo> getAllTasks() {
        log.debug(">> getAllTasks()");
        List<TaskVo> list = taskDao.findAll()
                .stream()
                .map(taskMapper::entityToVo)
                .collect(Collectors.toList());
        log.info("<< getAllTasks returned {} tasks", list.size());
        return list;
    }

    @Override
    @Transactional
    public TaskVo updateTask(Long id, TaskDto dto) {
        log.debug(">> updateTask(id={}, dto={})", id, dto);
        try {
            Task taskToUpdate = taskMapper.dtoToEntity(dto);
            taskToUpdate.setId(id);

            TaskVo returnTask = taskDao.updateTask(taskToUpdate);
            log.info("<< updateTask: successfully updated task {}", id);
            return returnTask;
        } catch (Exception e) {
            log.error("Error updating task {}: {}", id, e.getMessage(), e);
            throw e;
        }
    }

    @Override
    @Transactional
    public void deleteTask(Long id) {
        log.debug(">> deleteTask(id={})", id);
        taskDao.deleteById(id);
        log.info("<< deleteTask completed for id={}", id);
    }
}
