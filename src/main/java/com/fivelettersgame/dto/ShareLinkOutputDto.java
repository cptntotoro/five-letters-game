package com.fivelettersgame.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ShareLinkOutputDto {
    @JsonProperty("link")
    private String value;

    public ShareLinkOutputDto() {
    }

    public ShareLinkOutputDto(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
