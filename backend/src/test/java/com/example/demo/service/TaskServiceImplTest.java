package com.example.demo.service;

import com.example.demo.dao.TaskDao;
import com.example.demo.dto.TaskDto;
import com.example.demo.entity.Task;
import com.example.demo.mapper.TaskMapper;
import com.example.demo.service.impl.TaskServiceImpl;
import com.example.demo.vo.TaskVo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceImplTest {

    @Mock
    private TaskDao taskDao;

    @Mock
    private TaskMapper taskMapper;

    @InjectMocks
    private TaskServiceImpl service;

    private TaskDto dto;
    private Task entity;
    private TaskVo vo;

    @BeforeEach
    void setUp() {
        dto = new TaskDto();
        dto.setTitle("Test Task");
        dto.setDescription("Desc");
        dto.setCompleted(true);

        entity = new Task();
        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setCompleted(false);

        vo = new TaskVo();
        vo.setId(1L);
        vo.setTitle(entity.getTitle());
        vo.setDescription(entity.getDescription());
        vo.setCompleted(entity.getCompleted());
    }

    @Test
    void createTask_setsCompletedFalse_andReturnsVo() {
        when(taskMapper.dtoToEntity(dto)).thenReturn(entity);
        when(taskDao.createTask(entity)).thenReturn(vo);

        TaskVo result = service.createTask(dto);

        assertFalse(dto.getCompleted(), "DTO completed flag should be reset to false");
        assertEquals(vo, result);
        verify(taskDao).createTask(entity);
    }

    @Test
    void getTaskById_notFound_returnsNull() {
        when(taskDao.findById(10L)).thenReturn(null);

        TaskVo result = service.getTaskById(10L);
        assertNull(result);
        verify(taskDao).findById(10L);
    }

    @Test
    void getTaskById_found_returnsVo() {
        when(taskDao.findById(2L)).thenReturn(entity);
        when(taskMapper.entityToVo(entity)).thenReturn(vo);

        TaskVo result = service.getTaskById(2L);
        assertEquals(vo, result);
        verify(taskMapper).entityToVo(entity);
    }

    @Test
    void getAllTasks_returnsListOfVos() {
        when(taskDao.findAll()).thenReturn(Collections.singletonList(entity));
        when(taskMapper.entityToVo(entity)).thenReturn(vo);

        List<TaskVo> list = service.getAllTasks();
        assertEquals(1, list.size());
        assertEquals(vo, list.get(0));
    }

    @Test
    void updateTask_notFound_returnsNull() {
        when(taskMapper.dtoToEntity(dto)).thenReturn(entity);
        when(taskDao.updateTask(entity)).thenReturn(null);

        TaskVo result = service.updateTask(5L, dto);
        assertNull(result);
        verify(taskMapper).dtoToEntity(dto);
        verify(taskDao).updateTask(entity);
    }

    @Test
    void updateTask_found_updatesAndReturnsVo() {
        when(taskMapper.dtoToEntity(dto)).thenReturn(entity);
        when(taskDao.updateTask(entity)).thenReturn(vo);

        TaskVo result = service.updateTask(3L, dto);
        assertEquals(vo, result);
        verify(taskMapper).dtoToEntity(dto);
        verify(taskDao).updateTask(entity);
    }
}
