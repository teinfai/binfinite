package com.example.demo.dao.impl;

import com.example.demo.dao.TaskDao;
import com.example.demo.entity.Task;
import com.example.demo.mapper.TaskMapper;
import com.example.demo.repository.TaskRepo;
import com.example.demo.vo.TaskVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TaskDaoImpl implements TaskDao {

    private final TaskRepo taskRepo;
    private final TaskMapper taskMapper;
    private static final Logger log = LoggerFactory.getLogger(TaskDaoImpl.class);

    public TaskDaoImpl(
            TaskRepo taskRepo,
            TaskMapper taskMapper
    ) {
        this.taskRepo = taskRepo;
        this.taskMapper = taskMapper;
    }

    @Override
    public TaskVo createTask(Task entity) {
        log.debug(">> createTask(entity={})", entity);
        try {
            Task saved = taskRepo.save(entity);
            log.info("<< createTask: saved successfully with id={}", saved.getId());
            return taskMapper.entityToVo(saved);
        } catch (Exception e) {
            log.error("Error saving task: {}", e.getMessage(), e);
            throw e;
        }
    }

    @Override
    public Task findById(Long id) {
        log.debug(">> findById(id={})", id);
        Task found = taskRepo.findById(id).orElse(null);
        if (found == null) {
            log.warn("<< findById: no task found for id={}", id);
        } else {
            log.info("<< findById found {}", found);
        }
        return found;
    }

    @Override
    public List<Task> findAll() {
        log.debug(">> findAll()");
        List<Task> list = taskRepo.findAll();
        log.info("<< findAll returned {} tasks", list.size());
        return list;
    }

    @Override
    public TaskVo updateTask(Task entity) {
        log.debug(">> updateTask(entity={})", entity);
        Task saved = taskRepo.save(entity);
        log.info("<< updateTask updated id={}, title={}", saved.getId(), saved.getTitle());
        return taskMapper.entityToVo(saved);
    }

    @Override
    public void deleteById(Long id) {
        log.debug(">> deleteById(id={})", id);
        try {
            taskRepo.deleteById(id);
            log.info("<< deleteById: successfully deleted task {}", id);
        } catch (Exception e) {
            log.error("Error deleting task {}: {}", id, e.getMessage(), e);
            throw e;
        }
    }
}
