package com.fivelettersgame.exception;

public class OutOfWordsException extends RuntimeException {
    public OutOfWordsException(String message) {
        super(message);
    }
}
