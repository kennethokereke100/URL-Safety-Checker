package com.example.url_safety_checker.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * Configuration class for RestTemplate bean.
 * 
 * RestTemplate is used to make HTTP requests to external APIs like Google Safe Browsing
 * and VirusTotal. This configuration provides a single RestTemplate instance that can
 * be autowired throughout the application.
 */
@Configuration
public class RestTemplateConfig {

    /**
     * Creates and configures a RestTemplate bean for making HTTP requests.
     * 
     * RestTemplate is Spring's synchronous HTTP client that simplifies making
     * HTTP requests to external services. It handles JSON serialization/deserialization
     * and provides a clean API for GET, POST, PUT, DELETE operations.
     * 
     * @return Configured RestTemplate instance
     */
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
} 