package com.fivelettersgame.service;

public interface EncryptionService {

    /**
     * Зашифровать слово
     *
     * @param word - слово
     * @return зашифрованное слово
     */
    String encrypt(String word);

    /**
     * Расшифровать слово
     *
     * @param encryption - зашифрованное слово
     * @return слово
     */
    String decrypt(String encryption);
}
