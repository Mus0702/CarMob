package com.azoudmustafa.controller.auth;


import com.azoudmustafa.enums.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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
    @Size(min = 3, max = 50, message = "Lastname must contain at least 3 characters ")
    @NotNull(message = "Lastname is required")
    @JsonProperty("lastname")
    String lastname;
    @NotNull(message = "Firstname is required")
    @JsonProperty("firstname")
    @Size(min = 3, max = 50, message = "Firstname must contain max 50 characters ")
    String firstname;
    @Email(message = "Bad format")
    @NotNull(message = "Email is required")
    @JsonProperty("email")
    String email;
    @NotNull(message = "Password is required")
    @JsonProperty("password")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$")
    String password;
    @NotNull(message = "Birthdate is required")
    @JsonProperty("birthdate")
    LocalDate birthdate;
    @JsonProperty("phoneNumber")
    String phoneNumber;
    @JsonProperty("role")
    Role role;
}
