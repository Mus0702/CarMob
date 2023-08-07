package com.azoudmustafa.dto.user;

import com.azoudmustafa.enums.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record UserPostDTO(

        Integer id,

        String lastname,

        String firstname,

        String email,

        String password,

        LocalDate birthdate,

        String phoneNumber,

        Role role

) {
}
