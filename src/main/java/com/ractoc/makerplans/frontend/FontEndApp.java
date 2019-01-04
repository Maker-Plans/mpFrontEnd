package com.ractoc.makerplans.frontend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@ComponentScan(basePackages = "com.ractoc.makerplans")
public class FontEndApp {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(FontEndApp.class, args);
    }

}
