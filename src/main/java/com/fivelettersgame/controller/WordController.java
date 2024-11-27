package com.fivelettersgame.controller;

import com.fivelettersgame.dto.WordDto;
import com.fivelettersgame.model.Word;
import com.fivelettersgame.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class WordController {
    private WordService wordService;

    @Autowired
    public void setWordService(WordService wordService) {
        this.wordService = wordService;
    }

    @GetMapping(path = "/word")
    @ResponseStatus(code = HttpStatus.OK)
    @ResponseBody
    public WordDto getRandomWord() {
        return toWordDto(wordService.getRandom());
    }

    @PostMapping(path = "/word")
    @ResponseBody
    public WordDto getDecryptedWord(@RequestParam(value = "secret") String crypt) {
        return toWordDto(wordService.getDecrypted(crypt));
    }

    private WordDto toWordDto(Word word) {
        return new WordDto(word.getValue());
    }
}
