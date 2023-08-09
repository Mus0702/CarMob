package com.azoudmustafa.dto.route;

import com.azoudmustafa.dto.car.AddressDTO;
import com.azoudmustafa.dto.car.CarDTO;
import com.azoudmustafa.dto.user.UserGetDTO;
import com.azoudmustafa.dto.user.UserGetWithNamesDTO;

import java.time.LocalDate;

public record RouteGetOverviewDTO(
        Integer id,
        AddressDTO departureAddress,
        AddressDTO arrivalAddress,
        LocalDate departureDate,
        UserGetWithNamesDTO driver
) {

}
