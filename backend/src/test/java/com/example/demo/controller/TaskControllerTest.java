package com.example.demo.controller;

import com.example.demo.dto.TaskDto;
import com.example.demo.service.TaskService;
import com.example.demo.vo.TaskVo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;

@ExtendWith(MockitoExtension.class)
class TaskControllerTest {

    @Mock
    private TaskService taskService;

    @InjectMocks
    private TaskController controller;

    private TaskDto dto;
    private TaskVo vo;

    @BeforeEach
    void setUp() {
        dto = new TaskDto();
        dto.setTitle("Task");
        dto.setDescription("Desc");

        vo = new TaskVo();
        vo.setId(1L);
        vo.setTitle(dto.getTitle());
        vo.setDescription(dto.getDescription());
    }

    @Test
    void createtask_success() {
        when(taskService.createTask(dto)).thenReturn(vo);

        ResponseEntity<?> resp = controller.createtask(dto);
        assertEquals(HttpStatus.OK, resp.getStatusCode());
        assertEquals(vo, resp.getBody());
    }

    @Test
    void createtask_exception() {
        when(taskService.createTask(dto)).thenThrow(new RuntimeException("fail"));

        ResponseEntity<?> resp = controller.createtask(dto);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, resp.getStatusCode());
        assertTrue(resp.getBody().toString().contains("Error creating task: fail"));
    }

    @Test
    void getTask_notFound() {
        when(taskService.getTaskById(2L)).thenReturn(null);

        ResponseEntity<TaskVo> resp = controller.getTask(2L);
        assertEquals(HttpStatus.NOT_FOUND, resp.getStatusCode());
    }

    @Test
    void getTask_found() {
        when(taskService.getTaskById(3L)).thenReturn(vo);

        ResponseEntity<TaskVo> resp = controller.getTask(3L);
        assertEquals(HttpStatus.OK, resp.getStatusCode());
        assertEquals(vo, resp.getBody());
    }

    @Test
    void listAll_returnsVos() {
        when(taskService.getAllTasks()).thenReturn(Arrays.asList(vo));

        ResponseEntity<?> resp = controller.listAll();
        assertEquals(HttpStatus.OK, resp.getStatusCode());
        assertEquals(Arrays.asList(vo), resp.getBody());
    }

    @Test
    void updateTask_notFound() {
        TaskDto updateDto = new TaskDto();
        when(taskService.updateTask(4L, updateDto)).thenReturn(null);

        ResponseEntity<TaskVo> resp = controller.updateTask(4L, updateDto);
        assertEquals(HttpStatus.NOT_FOUND, resp.getStatusCode());
    }

    @Test
    void updateTask_found() {
        TaskDto updateDto = new TaskDto();
        when(taskService.updateTask(5L, updateDto)).thenReturn(vo);

        ResponseEntity<TaskVo> resp = controller.updateTask(5L, updateDto);
        assertEquals(HttpStatus.OK, resp.getStatusCode());
        assertEquals(vo, resp.getBody());
    }

    @Test
    void deleteTask_success() {
        doNothing().when(taskService).deleteTask(6L);

        ResponseEntity<Void> resp = controller.deleteTask(6L);
        assertEquals(HttpStatus.NO_CONTENT, resp.getStatusCode());
    }

    @Test
    void deleteTask_notFound() {
        doThrow(new org.springframework.dao.EmptyResultDataAccessException(1)).when(taskService).deleteTask(7L);

        ResponseEntity<Void> resp = controller.deleteTask(7L);
        assertEquals(HttpStatus.NOT_FOUND, resp.getStatusCode());
    }
}
