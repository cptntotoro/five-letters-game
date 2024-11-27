package com.fivelettersgame.service;

import com.fivelettersgame.exception.OutOfWordsException;
import com.fivelettersgame.exception.WordEncryptionException;
import com.fivelettersgame.model.Word;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class WordServiceImpl implements WordService {
    /**
     * Список игровых слов
     */
    private final List<String> wordList;

    /**
     * Зашифрованные слова, загаданные пользователями
     * K - слово, V - шифр
     */
    private final Map<String, String> encryptedWords = new HashMap<>();

    /**
     * Рандомайзер
     */
    private final Random randomizer = new Random();

    public WordServiceImpl() {
        this.wordList = new ArrayList<>(List.of("канат", "диван", "район"));
    }

    @Override
    public Word getRandom() {
        if (wordList.isEmpty()) {
            throw new OutOfWordsException("Закончились слова в пуле");
        }

        String randomWord = wordList.remove(randomizer.nextInt(wordList.size()));
        return new Word(randomWord);
    }

    @Override
    public String getEncrypted(String word) {
        String wordValue = validateWord(word);
        String encryptedWord = encryptedWords.get(wordValue);
        return encryptedWord != null ? encryptedWord : encrypt(word);
    }

    @Override
    public Word getDecrypted(String encryption) {
        String encryptionValue = validateEncryption(encryption);

        String word = encryptedWords.entrySet()
                .stream()
                .filter(entry -> entry.getValue().equals(encryptionValue))
                .findFirst()
                .map(Map.Entry::getKey).orElseThrow(() -> new WordEncryptionException("Ошибка получения слова по ссылке. Такое слово не было зашифровано."));

        return new Word(word);
    }

    private String encrypt(String word) {
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

    private String validateWord(String word) {
        word = word.toLowerCase();

        if (word.matches("^[а-я]+$") && word.length() == 5) {
            return word;
        } else {
            throw new WordEncryptionException("Ошибка шифрования слова. Введенное слово должно содержать символы кириллицы и иметь длину 5 букв.");
        }
    }

    private String validateEncryption(String encryption) {
        encryption = encryption.toLowerCase();

        if (encryption.matches("^[a-z]+$") && encryption.length() == 5) {
            return encryption;
        } else {
            throw new WordEncryptionException("Ошибка дешифрования слова. Введенное слово должно содержать символы латиницы и иметь длину 5 букв.");
        }
    }
}
