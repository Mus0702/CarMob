package com.azoudmustafa.controller.auth;


import com.azoudmustafa.enums.Role;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    @JsonProperty("id")
    Integer id;
    @NotNull
    @JsonProperty("lastname")
    @Size(min=3,max = 50,message = "Lastname must contain at least 3 characters ")
    String lastname;
    @NotNull
    @JsonProperty("firstname")
    @Size(min=3,max = 50,message = "Firstname must contain max 50 characters ")
    String firstname;
    @Email
    @NotNull
    @JsonProperty("email")
    String email;
    @NotNull
    @JsonProperty("password")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$")
    String password;
    @NotNull
    @JsonProperty("birthdate")
    LocalDate birthdate;
    @JsonProperty("phoneNumber")
    String phoneNumber;
    @JsonProperty("role")
    Role role;
}
