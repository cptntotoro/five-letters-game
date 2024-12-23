package com.fivelettersgame.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PageController.class)
@AutoConfigureMockMvc
public class PageControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    void getHomePage_shouldReturnStatusOk() throws Exception {
        mockMvc.perform(get("")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.TEXT_HTML))
                .andExpect(status().isOk());
    }

    @Test
    void getShareWordPage_shouldReturnStatusOk() throws Exception {
        mockMvc.perform(get("/share-word")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.TEXT_HTML))
                .andExpect(status().isOk());
    }

    @Test
    void getHomePageByShareLink_shouldReturnStatusOk() throws Exception {
        mockMvc.perform(get("/share")
                        .queryParam("secret", "bbqrp")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.TEXT_HTML))
                .andExpect(status().isOk());
    }
}
