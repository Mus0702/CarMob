package com.azoudmustafa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class CarMobApplication {

    public static void main(String[] args) {
        SpringApplication.run(CarMobApplication.class, args);
    }

}
