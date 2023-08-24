package com.azoudmustafa.dto.user;

import com.azoudmustafa.dto.car.CarDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor
public class UserGetDTO {

    private Integer id;
    @NotNull
    private String lastname;
    @NotNull
    private String firstname;
    @Email
    @NotNull
    private String email;
    private CarDTO car;
}
