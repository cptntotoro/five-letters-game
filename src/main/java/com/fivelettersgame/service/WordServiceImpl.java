package com.fivelettersgame.service;

import com.fivelettersgame.exception.OutOfWordsException;
import com.fivelettersgame.model.Word;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class WordServiceImpl implements WordService {
    private final List<String> wordList;

    public WordServiceImpl() {
        this.wordList = new ArrayList<>(List.of("канат", "диван", "район"));
    }

    @Override
    public Word getRandom() {
        if (wordList.isEmpty()) {
            throw new OutOfWordsException("Поздравляем, вы отгадали все слова!");
        }

        Random randomizer = new Random();
        String randomWord = wordList.remove(randomizer.nextInt(wordList.size()));
        return new Word(randomWord);
    }

}
