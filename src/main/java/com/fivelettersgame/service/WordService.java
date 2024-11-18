package com.fivelettersgame.service;

import com.fivelettersgame.model.Word;

public interface WordService {
    /**
     * Получить случайное слово
     *
     * @return Случайное слово
     */
    Word getRandom();
}
