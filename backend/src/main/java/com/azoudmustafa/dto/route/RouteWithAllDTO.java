package com.azoudmustafa.dto.route;

import com.azoudmustafa.dto.car.AddressDTO;
import com.azoudmustafa.dto.car.CarDTO;
import com.azoudmustafa.dto.user.UserGetWithNamesDTO;

import java.time.LocalDate;

public record RouteWithAllDTO(
        Integer id,
        AddressDTO departureAddress,
        AddressDTO arrivalAddress,
        LocalDate departureDate,
        int passengerNumber,
        UserGetWithNamesDTO driver,
        CarDTO car,
        double routePrice
) {
}
