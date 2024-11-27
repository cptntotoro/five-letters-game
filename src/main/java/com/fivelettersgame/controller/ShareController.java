package com.fivelettersgame.controller;

import com.fivelettersgame.dto.ShareLinkOutputDto;
import com.fivelettersgame.service.LinkService;
import com.fivelettersgame.service.WordService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class ShareController {
    private WordService wordService;
    private LinkService linkService;

    @Autowired
    public void setWordService(WordService wordService) {
        this.wordService = wordService;
    }

    @Autowired
    public void setLinkService(LinkService linkService) {
        this.linkService = linkService;
    }

    @GetMapping(path = "/link")
    @ResponseStatus(code = HttpStatus.OK)
    @ResponseBody
    public ShareLinkOutputDto getShareLink(@RequestParam(value = "word") String word, HttpServletRequest request) {
        StringBuffer fullUrl = request.getRequestURL();
        String baseUrl = fullUrl.substring(0, fullUrl.length() - 5);

        List<String> pathVars = List.of("share");

        String requestParam = "secret";
        String encryption = wordService.getEncrypted(word);

        Map<String, String> requestParams = Collections.singletonMap(requestParam, encryption);
        return toShareLinkOutputDto(linkService.getShareLink(baseUrl, pathVars, requestParams));
    }

    private ShareLinkOutputDto toShareLinkOutputDto(String shareLink) {
        return new ShareLinkOutputDto(shareLink);
    }
}
