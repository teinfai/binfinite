package com.example.demo.controller;
import com.example.demo.dto.TaskDto;
import com.example.demo.service.TaskService;
import com.example.demo.vo.TaskVo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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

    @Autowired
    private TaskService taskService;

    @PostMapping("/createTask")
    @ApiOperation(value = "Create a new task")
    public ResponseEntity<?> createtask(@Valid @RequestBody TaskDto taskDto) {
        try {
            return ResponseEntity.ok(taskService.createTask(taskDto));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating task: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskVo> getTask(@PathVariable Long id) {
        TaskVo vo = taskService.getTaskById(id);
        if (vo == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(vo);
    }

    @GetMapping("/listAll")
    public ResponseEntity<List<TaskVo>> listAll() {
        List<TaskVo> all = taskService.getAllTasks();
        return ResponseEntity.ok(all);
    }

    @PutMapping("updateTask/{id}")
    public ResponseEntity<TaskVo> updateTask(
            @PathVariable Long id,
            @RequestBody TaskDto dto
    ) {
        TaskVo updated = taskService.updateTask(id, dto);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        try {
            taskService.deleteTask(id);
            return ResponseEntity.noContent().build();
        } catch (org.springframework.dao.EmptyResultDataAccessException ex) {
            return ResponseEntity.notFound().build();
        }
    }

}
