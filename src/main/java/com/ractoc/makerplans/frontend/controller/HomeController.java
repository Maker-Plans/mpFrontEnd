package com.ractoc.makerplans.frontend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @RequestMapping(value = {"/", "/categories/**"})
    public String index() {
        return "index";
    }

}
