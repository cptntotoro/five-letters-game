package com.fivelettersgame.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class WordExceptionHandler {

    @ExceptionHandler(OutOfWordsException.class)
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void arrayNotFoundException(OutOfWordsException e) {}
}