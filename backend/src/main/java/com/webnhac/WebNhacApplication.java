package com.webnhac;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class WebNhacApplication {

    public static void main(String[] args) {
        SpringApplication.run(WebNhacApplication.class, args);
    }
}
