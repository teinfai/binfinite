package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		log.info("Starting Application...");
		SpringApplication.run(DemoApplication.class, args);
		log.info("Application Started Successfully!");
	}

}
