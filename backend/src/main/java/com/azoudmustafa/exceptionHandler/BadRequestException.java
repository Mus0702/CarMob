package com.azoudmustafa.exceptionHandler;

public class BadRequestException extends RuntimeException{

    public BadRequestException(String message){
        super(message);
    }
}
