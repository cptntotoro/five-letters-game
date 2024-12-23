package com.fivelettersgame.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class PageController {

    @GetMapping("")
    public String getHomePage() {
        return "index.html";
    }

    @GetMapping("/share-word")
    public String getShareWordPage() {
        return "share-word.html";
    }

    @GetMapping("/share")
    public String getHomePageByShareLink(@RequestParam(value = "secret") String encryption) {
        return "index.html";
    }
}
