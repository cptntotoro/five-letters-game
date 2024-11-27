package com.fivelettersgame.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class LinkServiceImpl implements LinkService {
    @Override
    public String getShareLink(String url, List<String> pathVars, Map<String, String> requestParams) {
        String baseUrl = getBaseUrl(url);
        StringBuilder sb = new StringBuilder(baseUrl);

        if (pathVars != null && !pathVars.isEmpty()) {
            sb.append("/");
            sb.append(String.join("/", pathVars));
        }

        if (requestParams != null && !requestParams.isEmpty()) {
            String params = requestParams.entrySet().stream()
            .map(entry -> String.join("=", entry.getKey(), entry.getValue()))
            .collect(Collectors.joining("&"));

            sb.append("?");
            sb.append(params);
        }

        return sb.toString();
    }

    private String getBaseUrl(String baseUrl) {
        return baseUrl.endsWith("/") ? baseUrl.substring(0, baseUrl.length() - 1) : baseUrl;
    }

}
