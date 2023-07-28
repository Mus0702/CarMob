package com.azoudmustafa.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record UserGetDTO(
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
        String email
) {
}
