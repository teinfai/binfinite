package com.example.demo.enums;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public enum TaskStatus {
    PENDING("PENDING","Pending"),
    COMPLETED("COMPLETED", "Completed");

    private final String code;
    private final String description;

    TaskStatus(String code, String description) {
        this.code = code;
        this.description = description;
    }

    public String getCode() {
        return code;
    }

    public String getDescription() {
        return description;
    }

    private static final Map<String, TaskStatus> lookupMap = new HashMap<>();

    static {
        for (TaskStatus d : TaskStatus.values()) {
            lookupMap.put(d.getCode(), d);
        }
    }

    public static TaskStatus findByKey(String key) {
        return lookupMap.get(key);
    }

    public static final List<TaskStatus> getStatuses = getAllStatusCodes();

    private static List<TaskStatus> getAllStatusCodes() {
        List<TaskStatus> result = new ArrayList<>();
        result.add(PENDING);
        result.add(COMPLETED);
        return result;
    }
}
