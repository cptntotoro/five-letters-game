package com.fivelettersgame.service;

import com.fivelettersgame.exception.WordEncryptionException;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class EncryptionServiceImpl implements EncryptionService {

    private EncryptionServiceImpl() {
    }

    private static class EncryptionServiceSingleton {
        public static final EncryptionService ENCRYPTION_SERVICE_INSTANCE = new EncryptionServiceImpl();
    }

    public static EncryptionService getInstance() {
        return EncryptionServiceSingleton.ENCRYPTION_SERVICE_INSTANCE;
    }

    /**
     * Зашифрованные слова, загаданные пользователями
     * K - слово, V - шифр
     */
    private final Map<String, String> encryptedWords = new HashMap<>();

    /**
     * Рандомайзер
     */
    private final Random randomizer = new Random();

    @Override
    public String encrypt(String word) {
        String wordValue = validateWord(word);
        String encryptedWord = encryptedWords.get(wordValue);
        return encryptedWord != null ? encryptedWord : getEncrypted(word);
    }

    @Override
    public String decrypt(String encryption) {
        String encryptionValue = validateEncryption(encryption);

        return encryptedWords.entrySet()
                .stream()
                .filter(entry -> entry.getValue().equals(encryptionValue))
                .findFirst()
                .map(Map.Entry::getKey)
                .orElseThrow(() -> new WordEncryptionException("Ошибка получения слова по ссылке. Такое слово не было зашифровано."));
    }

    private String getEncrypted(String word) {
        StringBuilder sb = new StringBuilder();
        int offset = randomizer.nextInt(26);

        for (char character : word.toCharArray()) {
            int originalAlphabetPosition = character - 'a';
            int newAlphabetPosition = (originalAlphabetPosition + offset) % 26;
            char newCharacter = (char) ('a' + newAlphabetPosition);
            sb.append(newCharacter);
        }

        encryptedWords.put(word, sb.toString());
        return encryptedWords.get(word);
    }

    private String validateEncryption(String encryption) {
        encryption = encryption.toLowerCase();

        if (encryption.matches("^[a-z]+$") && encryption.length() == 5) {
            return encryption;
        } else {
            throw new WordEncryptionException("Ошибка дешифрования слова. Введенное слово должно содержать символы латиницы и иметь длину 5 букв.");
        }
    }

    private String validateWord(String word) {
        word = word.toLowerCase();

        if (word.matches("^[а-яё]+$") && word.length() == 5) {
            return word;
        } else {
            throw new WordEncryptionException("Ошибка шифрования слова. Введенное слово должно содержать символы кириллицы и иметь длину 5 букв.");
        }
    }
}
