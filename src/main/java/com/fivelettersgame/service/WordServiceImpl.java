package com.fivelettersgame.service;

import com.fivelettersgame.exception.OutOfWordsException;
import com.fivelettersgame.model.Word;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class WordServiceImpl implements WordService {
    /**
     * Список игровых слов
     */
    private final List<String> wordList;

    /**
     * Рандомайзер
     */
    private final Random randomizer = new Random();

    /**
     * Синглтон сервиса шифрования слов
     */
    private final EncryptionService encryptionService = EncryptionServiceImpl.getInstance();

    public WordServiceImpl() {
        this.wordList = new ArrayList<>(List.of("канат", "диван", "район", "пожар", "бугор", "галоп", "пульс", "унция", "тонус", "трата"));
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
        return encryptionService.encrypt(word);
    }

    @Override
    public Word getDecrypted(String encryption) {
        String word = encryptionService.decrypt(encryption);
        return new Word(word);
    }
}
