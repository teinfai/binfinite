package com.example.demo.dto;

import com.example.demo.enums.TaskStatus;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
@Getter
@Setter
@Data
public class TaskDto {
    private String title;
    private String description;
    private Boolean completed;    // new
    // getters & setters
}



