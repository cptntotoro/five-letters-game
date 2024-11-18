package com.fivelettersgame.controller;

import com.fivelettersgame.exception.OutOfWordsException;
import com.fivelettersgame.model.Word;
import com.fivelettersgame.service.WordService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(WordController.class)
@AutoConfigureMockMvc
public class WordControllerTest {
    @MockBean
    private WordService wordService;

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getRandomWord_shouldReturnStatusOk() throws Exception {
        Mockito.when(wordService.getRandom()).thenReturn(new Word("лента"));

        mockMvc.perform(get("/word")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void getRandomWord_shouldReturnStatusNoContent() throws Exception {
        Mockito.when(wordService.getRandom()).thenThrow(new OutOfWordsException("Поздравляем, вы отгадали все слова!"));

        mockMvc.perform(get("/word")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }
}
