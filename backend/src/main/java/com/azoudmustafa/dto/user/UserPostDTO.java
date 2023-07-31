package com.azoudmustafa.dto.user;

import com.azoudmustafa.enums.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record UserPostDTO(
        @JsonProperty("id")
        Integer id,
        @NotNull
        @JsonProperty("lastname")
        @Size(min=3,max = 10,message = "taille entre 3 et 10")
        String lastname,
        @NotNull
        @JsonProperty("firstname")
        @Size(min=3,max = 10,message = "{validation.name.size.too_short}")
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
        String phoneNumber,
        @JsonProperty("role")
        Role role

) {
}
