package com.example.url_safety_checker.service;

import com.example.url_safety_checker.model.CheckResult;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Test class for UrlCheckService.
 * 
 * This class contains integration tests that verify the UrlCheckService
 * correctly identifies safe and unsafe URLs using the Google Safe Browsing API.
 * 
 * The tests use real API calls to ensure the service works correctly
 * with actual external dependencies.
 */
@SpringBootTest
public class UrlCheckServiceTest {

    @Autowired
    private UrlCheckService urlCheckService;

    /**
     * Test that verifies the service correctly identifies a known unsafe URL.
     * 
     * This test uses Google's test URL for malware which is specifically designed
     * to trigger the Safe Browsing API and return unsafe results.
     * 
     * Expected result: The service should return "unsafe" status.
     */
    @Test
    public void testUnsafeUrl() {
        // Given: A known unsafe URL (Google's test malware URL)
        String unsafeUrl = "http://testsafebrowsing.appspot.com/s/malware.html";
        
        // When: The service checks the URL
        CheckResult result = urlCheckService.checkUrl(unsafeUrl);
        
        // Then: The result should indicate the URL is unsafe
        assertEquals("unsafe", result.getStatus(), 
            "URL should be identified as unsafe");
    }

    /**
     * Test that verifies the service correctly identifies a safe URL.
     * 
     * This test uses a well-known safe domain (example.com) which should
     * not trigger any threats in the Google Safe Browsing database.
     * 
     * Expected result: The service should return "safe" status.
     */
    @Test
    public void testSafeUrl() {
        // Given: A known safe URL
        String safeUrl = "https://www.example.com";
        
        // When: The service checks the URL
        CheckResult result = urlCheckService.checkUrl(safeUrl);
        
        // Then: The result should indicate the URL is safe
        assertEquals("safe", result.getStatus(), 
            "URL should be identified as safe");
    }
} 