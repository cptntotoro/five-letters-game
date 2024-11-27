package com.fivelettersgame.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class WordDto {
    @JsonProperty("word")
    private String value;

    public WordDto() {
    }

    public WordDto(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
