package com.azoudmustafa.dto.route;

import com.azoudmustafa.dto.car.CarDTO;
import com.azoudmustafa.dto.user.UserGetWithNamesDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor
public class RouteWithCarAndUserDTO{
    Integer id;
    LocalDate departureDate;
    int passengerNumber;
    UserGetWithNamesDTO driver;
    double routePrice;
}
