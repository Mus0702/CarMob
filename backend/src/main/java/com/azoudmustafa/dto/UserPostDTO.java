package com.azoudmustafa.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record UserPostDTO(
        @JsonProperty("id")
        Integer id,
        @NotNull
        @JsonProperty("lastname")
        String lastname,
        @NotNull
        @JsonProperty("firstname")
        String firstname,
        @Email
        @NotNull
        @JsonProperty("email")
        String email,
        @NotNull
        @JsonProperty("password")
        String password,
        @NotNull
        @JsonProperty("birthdate")
        LocalDate birthdate,
        @JsonProperty("phoneNumber")
        String phoneNumber

) {
}
