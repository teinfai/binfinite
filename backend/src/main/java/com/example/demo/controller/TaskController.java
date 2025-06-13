package com.example.demo.controller;

import com.example.demo.dto.TaskDto;
import com.example.demo.service.TaskService;
import com.example.demo.vo.TaskVo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/task")
@Api(value = "Task API", tags = "Task API")
public class TaskController {

    private static final Logger log = LoggerFactory.getLogger(TaskController.class);

    @Autowired
    private TaskService taskService;

    @PostMapping("/createTask")
    @ApiOperation(value = "Create a new task")
    public ResponseEntity<?> createtask(@Valid @RequestBody TaskDto taskDto) {
        log.info("Request to create task: {}", taskDto);
        try {
            TaskVo vo = taskService.createTask(taskDto);
            log.info("Task created successfully: id={}, title={}", vo.getId(), vo.getTitle());
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            log.error("Error creating task: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating task: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskVo> getTask(@PathVariable Long id) {
        log.info("Request to get task by id: {}", id);
        TaskVo vo = taskService.getTaskById(id);
        if (vo == null) {
            log.warn("Task not found with id: {}", id);
            return ResponseEntity.notFound().build();
        }
        log.info("Found task: {}", vo);
        return ResponseEntity.ok(vo);
    }

    @GetMapping("/listAll")
    public ResponseEntity<List<TaskVo>> listAll() {
        log.info("Request to list all tasks");
        List<TaskVo> all = taskService.getAllTasks();
        log.info("Returning {} tasks", all.size());
        return ResponseEntity.ok(all);
    }

    @PutMapping("/updateTask/{id}")
    public ResponseEntity<TaskVo> updateTask(
            @PathVariable Long id,
            @RequestBody TaskDto dto
    ) {
        log.info("Request to update task id={}, data={}", id, dto);
        TaskVo updated = taskService.updateTask(id, dto);
        if (updated == null) {
            log.warn("Task to update not found with id: {}", id);
            return ResponseEntity.notFound().build();
        }
        log.info("Task updated successfully: {}", updated);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        log.info("Request to delete task id: {}", id);
        try {
            taskService.deleteTask(id);
            log.info("Task deleted successfully with id: {}", id);
            return ResponseEntity.noContent().build();
        } catch (org.springframework.dao.EmptyResultDataAccessException ex) {
            log.warn("Task to delete not found with id: {}", id);
            return ResponseEntity.notFound().build();
        } catch (Exception ex) {
            log.error("Unexpected error deleting task {}: {}", id, ex.getMessage(), ex);
            throw ex;
        }
    }
}
