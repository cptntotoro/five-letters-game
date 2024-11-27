package com.fivelettersgame.service;

import com.fivelettersgame.model.Word;

/**
 * Сервис управления словами
 */
public interface WordService {
    /**
     * Получить случайное слово
     *
     * @return Случайное слово
     */
    Word getRandom();

    /**
     * Получить зашифрованное слово
     *
     * @param word - слово
     * @return уникальный код слова для ссылки
     */
    String getEncrypted(String word);

    /**
     * Получить слово
     *
     * @param encryption - зашифрованное слово
     * @return слово
     */
    Word getDecrypted(String encryption);
}
