package com.fivelettersgame.service;

import com.fivelettersgame.exception.WordEncryptionException;
import com.fivelettersgame.model.Word;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(MockitoExtension.class)
public class WordServiceTest {

    @InjectMocks
    private WordServiceImpl wordService;

    @Test
    void getRandom_shouldReturnWord() {
        Word word = wordService.getRandom();
        assertNotNull(word.getValue());
    }

    @Test
    void getEncrypted_shouldReturnEncryptedWord_whenBeingLowerCase() {
        String word = "лента";
        String encryption = wordService.getEncrypted(word);

        assertNotNull(encryption);
        assertTrue(encryption.matches("^[a-z]+$"));
        assertEquals(5, encryption.length());
    }

    @Test
    void getEncrypted_shouldReturnEncryptedWord_whenHavingUpperCaseSymbols() {
        String word = "КуХнЯ";
        String encryption = wordService.getEncrypted(word);

        assertNotNull(encryption);
        assertTrue(encryption.matches("^[a-z]+$"));
        assertEquals(5, encryption.length());
    }

    @Test
    void getEncrypted_throwsException_whenWhenHavingNonLetterSymbols() {
        String word = "к-=%+";
        assertThrows(WordEncryptionException.class, () -> wordService.getEncrypted(word));
    }

    @Test
    void getEncrypted_throwsException_whenWhenHavingLatinSymbols() {
        String word = "trust";
        assertThrows(WordEncryptionException.class, () -> wordService.getEncrypted(word));
    }
}
