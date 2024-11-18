package com.fivelettersgame.service;

import com.fivelettersgame.model.Word;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
public class WordServiceTest {

    @InjectMocks
    private WordServiceImpl wordService;

    @Test
    void getRandom_shouldReturnWord() {
        Word word = wordService.getRandom();
        assertNotNull(word);
    }
}
