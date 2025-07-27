package com.example.url_safety_checker.model;

import lombok.Data;
import java.util.List;
import java.util.Map;

/**
 * Model class representing the result of a URL safety check.
 * Contains the overall safety status and results from multiple security sources.
 */
@Data
public class CheckResult {
    private String status;
    private List<Map<String, String>> sources;
} 