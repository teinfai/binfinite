package com.example.demo.mapper;

import com.example.demo.dto.TaskDto;
import com.example.demo.entity.Task;
import com.example.demo.vo.TaskVo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface TaskMapper {

    @Mappings({
            @Mapping(target = "title", source = "title"),
            @Mapping(target = "description", source = "description"),
            @Mapping(target = "completed", source = "completed")
    })
    Task dtoToEntity(TaskDto dto);

    @Mappings({
            @Mapping(target = "id", source = "id"),
            @Mapping(target = "title", source = "title"),
            @Mapping(target = "description", source = "description"),
            @Mapping(target = "completed", source = "completed")
    })
    TaskVo entityToVo(Task entity);

}
