package com.fivelettersgame.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class WordExceptionHandler {

    @ExceptionHandler(OutOfWordsException.class)
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void outOfWordsException(OutOfWordsException e) {}

    @ExceptionHandler(WordEncryptionException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public void wordEncryptionException(WordEncryptionException e) {}
}