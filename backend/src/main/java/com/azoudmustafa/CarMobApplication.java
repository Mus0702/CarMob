package com.azoudmustafa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableCaching
@SpringBootApplication
@EnableScheduling
public class CarMobApplication {

    public static void main(String[] args) {
        SpringApplication.run(CarMobApplication.class, args);
    }

}
