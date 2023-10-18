package com.azoudmustafa.dto.user;

import com.azoudmustafa.dto.car.CarDTO;
import lombok.*;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class UserGetDTO {
    private Integer id;
    private String lastname;
    private String firstname;
    private String email;
    private CarDTO car;
}
