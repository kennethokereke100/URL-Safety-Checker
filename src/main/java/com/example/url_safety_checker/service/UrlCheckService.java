package com.example.url_safety_checker.service;

import com.example.url_safety_checker.model.CheckResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Service class for handling URL safety checks.
 * This service integrates with Google Safe Browsing API to provide URL safety analysis.
 */
@Service
public class UrlCheckService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${google.api.key}")
    private String googleApiKey;

    @Value("${google.safebrowsing.url}")
    private String googleSafeBrowsingUrl;

    /**
     * Checks the safety of a given URL using Google Safe Browsing API.
     * 
     * This method performs a safety check by calling Google Safe Browsing API to check for known threats
     * including malware, phishing, unwanted software, and potentially harmful applications.
     * 
     * @param url The URL to check for safety
     * @return CheckResult containing the safety status and detailed results from Google Safe Browsing
     */
    public CheckResult checkUrl(String url) {
        CheckResult result = new CheckResult();
        
        // Check with Google Safe Browsing API
        Map<String, String> googleResult = checkGoogleSafeBrowsing(url);
        
        // Set the overall safety status based on Google Safe Browsing result
        result.setStatus(googleResult.get("result"));
        result.setSources(List.of(googleResult));
        
        return result;
    }

    /**
     * Checks URL safety using Google Safe Browsing API.
     * 
     * Google Safe Browsing API checks against Google's database of known threats including:
     * - Malware sites
     * - Phishing sites
     * - Social engineering attacks
     * 
     * The API uses a POST request with a specific JSON payload structure that includes
     * threat types, platform types, and the URL to check.
     * 
     * @param url The URL to check
     * @return Map containing source name and result ("safe" or "unsafe")
     */
    private Map<String, String> checkGoogleSafeBrowsing(String url) {
        try {
            // Build the request body according to Google Safe Browsing API specification
            Map<String, Object> requestBody = new HashMap<>();
            
            // Client information - identifies our application to Google
            Map<String, String> client = new HashMap<>();
            client.put("clientId", "url-safety-checker");
            client.put("clientVersion", "1.0");
            requestBody.put("client", client);
            
            // Threat information - specifies what types of threats to check for
            Map<String, Object> threatInfo = new HashMap<>();
            threatInfo.put("threatTypes", List.of(
                "MALWARE",
                "SOCIAL_ENGINEERING",
                "UNWANTED_SOFTWARE"
            ));
            threatInfo.put("platformTypes", List.of("ANY_PLATFORM"));
            threatInfo.put("threatEntryTypes", List.of("URL"));
            threatInfo.put("threatEntries", List.of(Map.of("url", url)));
            requestBody.put("threatInfo", threatInfo);
            
            // Make the API call with the API key as a query parameter
            String apiUrl = googleSafeBrowsingUrl + "?key=" + googleApiKey;
            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, requestBody, Map.class);
            
            // Parse the response - if "matches" array exists, the URL has threats
            Map<String, Object> responseBody = response.getBody();
            boolean hasThreats = responseBody != null && responseBody.containsKey("matches");
            
            Map<String, String> result = new HashMap<>();
            result.put("source", "Google Safe Browsing");
            result.put("result", hasThreats ? "unsafe" : "safe");
            
            return result;
            
        } catch (Exception e) {
            // If API call fails, return safe as default (fail-safe approach)
            Map<String, String> result = new HashMap<>();
            result.put("source", "Google Safe Browsing");
            result.put("result", "safe");
            return result;
        }
    }


} 