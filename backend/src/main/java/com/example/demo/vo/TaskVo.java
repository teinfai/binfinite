package com.example.demo.vo;
import com.example.demo.enums.TaskStatus;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TaskVo {

    private Long id;
    private String title;
    private String description;
    private Boolean completed;  // new
}
