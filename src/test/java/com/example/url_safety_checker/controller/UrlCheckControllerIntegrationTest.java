package com.example.url_safety_checker.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration test class for UrlCheckController.
 * 
 * This class tests the REST endpoint /check-url with real HTTP requests
 * using MockMvc. The tests verify that the controller correctly handles
 * POST requests and returns appropriate JSON responses for both safe and unsafe URLs.
 * 
 * The tests use real API calls to Google Safe Browsing to ensure end-to-end
 * functionality of the URL safety checking feature.
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class UrlCheckControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    /**
     * Integration test for checking an unsafe URL.
     * 
     * This test sends a POST request to /check-url with a known unsafe URL
     * and verifies that the response indicates the URL is unsafe.
     * 
     * Test flow:
     * 1. Send POST request with unsafe URL
     * 2. Verify HTTP status is 200 OK
     * 3. Verify response JSON contains "status": "unsafe"
     */
    @Test
    public void testCheckUrl_UnsafeUrl_ReturnsUnsafeStatus() throws Exception {
        // Given: A request with a known unsafe URL
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("url", "http://testsafebrowsing.appspot.com/s/malware.html");
        
        String requestJson = objectMapper.writeValueAsString(requestBody);
        
        // When & Then: Send POST request and verify response
        mockMvc.perform(post("/check-url")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestJson))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.status").value("unsafe"));
    }

    /**
     * Integration test for checking a safe URL.
     * 
     * This test sends a POST request to /check-url with a known safe URL
     * and verifies that the response indicates the URL is safe.
     * 
     * Test flow:
     * 1. Send POST request with safe URL
     * 2. Verify HTTP status is 200 OK
     * 3. Verify response JSON contains "status": "safe"
     */
    @Test
    public void testCheckUrl_SafeUrl_ReturnsSafeStatus() throws Exception {
        // Given: A request with a known safe URL
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("url", "https://www.example.com");
        
        String requestJson = objectMapper.writeValueAsString(requestBody);
        
        // When & Then: Send POST request and verify response
        mockMvc.perform(post("/check-url")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestJson))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.status").value("safe"));
    }
} 