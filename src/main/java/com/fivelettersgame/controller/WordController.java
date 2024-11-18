package com.fivelettersgame.controller;

import com.fivelettersgame.dto.WordDtoOutput;
import com.fivelettersgame.model.Word;
import com.fivelettersgame.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class WordController {
    private final WordService wordService;

    @Autowired
    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    @GetMapping(path = "/word")
    @ResponseStatus(code = HttpStatus.OK)
    @ResponseBody
    public WordDtoOutput getRandomWord() {
        return toWordDtoOutput(wordService.getRandom());
    }

    private WordDtoOutput toWordDtoOutput(Word word) {
        return new WordDtoOutput(word.getWord());
    }
}
