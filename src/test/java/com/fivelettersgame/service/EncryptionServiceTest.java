package com.fivelettersgame.service;

import com.fivelettersgame.exception.WordEncryptionException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(MockitoExtension.class)
public class EncryptionServiceTest {

    @InjectMocks
    private EncryptionServiceImpl encryptionService;

    @Test
    void encrypt_shouldReturnEncryptedWord_whenBeingLowerCase() {
        String word = "тёзка";
        String encryption = encryptionService.encrypt(word);

        assertNotNull(encryption);
        assertTrue(encryption.matches("^[a-z]+$"));
        assertEquals(5, encryption.length());
    }

    @Test
    void encrypt_throwsException_whenWhenHavingNonLetterSymbols() {
        String word = "к-=%+";
        assertThrows(WordEncryptionException.class, () -> encryptionService.encrypt(word));
    }

    @Test
    void encrypt_throwsException_whenWhenHavingLatinSymbols() {
        String word = "trust";
        assertThrows(WordEncryptionException.class, () -> encryptionService.encrypt(word));
    }

    @Test
    void encrypt_shouldReturnEncryptedWord_whenHavingUpperCaseSymbols() {
        String word = "КуХнЯ";
        String encryption = encryptionService.encrypt(word);

        assertNotNull(encryption);
        assertTrue(encryption.matches("^[a-z]+$"));
        assertEquals(5, encryption.length());
    }
}
