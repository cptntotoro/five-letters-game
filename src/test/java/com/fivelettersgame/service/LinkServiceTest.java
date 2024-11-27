package com.fivelettersgame.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
public class LinkServiceTest {

    @InjectMocks
    private LinkServiceImpl linkService;

    @Test
    void getShareLink_shouldReturnExpectedLink_whenSinglePathVarAndRequestParam() {
        String baseUrl = "http://localhost:9090";
        List<String> pathVars = Collections.singletonList("share");
        Map<String, String> requestParams = Collections.singletonMap("secret", "qwert");

        String link = linkService.getShareLink(baseUrl, pathVars, requestParams);

        assertNotNull(link);
        assertEquals("http://localhost:9090/share?secret=qwert", link);
    }

    @Test
    void getShareLink_shouldReturnExpectedLink_whenMultiplePathVarsAndRequestParams() {
        String baseUrl = "http://localhost:9090";
        List<String> pathVars = List.of("user", "share");
        Map<String, String> requestParams = new LinkedHashMap<>();
        requestParams.put("secret", "qwert");
        requestParams.put("param", "value");

        String link = linkService.getShareLink(baseUrl, pathVars, requestParams);

        assertNotNull(link);
        assertEquals("http://localhost:9090/user/share?secret=qwert&param=value", link);
    }

    @Test
    void getShareLink_shouldReturnExpectedLink_whenPathVarsAndRequestParamsAreNull() {
        String baseUrl = "http://localhost:9090";

        String link = linkService.getShareLink(baseUrl, null, null);

        assertNotNull(link);
        assertEquals("http://localhost:9090", link);
    }

    @Test
    void getShareLink_shouldReturnExpectedLink_whenPathVarsAndRequestParamsAreEmpty() {
        String baseUrl = "http://localhost:9090";

        String link = linkService.getShareLink(baseUrl, Collections.emptyList(), Collections.emptyMap());

        assertNotNull(link);
        assertEquals("http://localhost:9090", link);
    }
}
