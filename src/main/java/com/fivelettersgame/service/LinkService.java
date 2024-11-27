package com.fivelettersgame.service;

import java.util.List;
import java.util.Map;

/**
 * Сервис управления ссылками
 */
public interface LinkService {
    /**
     * Сгенерировать ссылку
     *
     * @param baseUrl - URL без параметров
     * @param pathVars - переменные пути
     * @param requestParams - параметры запроса <параметр, значение>
     * @return Ссылка
     */
    String getShareLink(String baseUrl, List<String> pathVars, Map<String, String> requestParams);
}
