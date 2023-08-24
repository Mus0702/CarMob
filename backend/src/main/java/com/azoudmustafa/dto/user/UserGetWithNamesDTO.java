package com.azoudmustafa.dto.user;

import com.azoudmustafa.dto.car.CarDTO;
import com.azoudmustafa.model.Car;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor
public class UserGetWithNamesDTO {
    private Integer id;
    private String lastname;
    private String firstname;
    private Double rating;
    private CarDTO car;
}
