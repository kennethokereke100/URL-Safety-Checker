package com.example.url_safety_checker.controller;

import com.example.url_safety_checker.model.CheckResult;
import com.example.url_safety_checker.service.UrlCheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST Controller for handling URL safety check requests.
 * 
 * This controller provides HTTP endpoints for checking the safety of URLs.
 * It handles incoming HTTP requests and returns JSON responses.
 * 
 * @RestController - This annotation is a convenience annotation that combines @Controller and @ResponseBody.
 *                   It tells Spring Boot that this class is a REST controller, meaning:
 *                   - @Controller: This class handles HTTP requests and contains request mapping methods
 *                   - @ResponseBody: Methods in this class return data that should be written directly
 *                     to the HTTP response body (typically as JSON), rather than being interpreted as
 *                     a view name for rendering a template.
 *                   This is perfect for building REST APIs that return JSON responses.
 * 
 * @author URL Safety Checker Team
 * @version 1.0.0
 */
@RestController
public class UrlCheckController {

    @Autowired
    private UrlCheckService urlCheckService;

    /**
     * POST endpoint for checking URL safety.
     * 
     * This method handles POST requests to the /check-url path.
     * It accepts a JSON payload containing a URL and returns
     * safety information from multiple sources.
     * 
     * @param requestBody The JSON request body containing the URL to check
     * @return A Map representing the JSON response with safety status and source results
     * 
     * @PostMapping("/check-url") - This annotation tells Spring Boot that this method
     *                              should handle HTTP POST requests to the "/check-url" path.
     *                              When a client sends a POST request to http://localhost:8080/check-url,
     *                              this method will be invoked.
     * 
     * @RequestBody Map<String, Object> requestBody - This annotation tells Spring Boot to
     *                                               automatically parse the JSON request body into a Map.
     *                                               For example, if the client sends:
     *                                               { "url": "http://example.com" }
     *                                               Spring will create a Map where:
     *                                               - key = "url"
     *                                               - value = "http://example.com"
     *                                               This eliminates the need to manually parse JSON.
     */
    @PostMapping("/check-url")
    public CheckResult checkUrl(@RequestBody Map<String, Object> requestBody) {
        
        // Extract the URL from the request body
        String url = (String) requestBody.get("url");
        
        // Use the service to check URL safety
        // The service will handle the actual logic and return a CheckResult object
        return urlCheckService.checkUrl(url);
    }
} 