package com.fivelettersgame.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class PageController {

    @GetMapping("")
    public String getHomepage() {
        return "index.html";
    }

    @GetMapping("/share")
    public String getHomepageByShareLink(@RequestParam(value = "secret") String encryption) {
        return "index.html";
    }
}
