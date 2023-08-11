package com.azoudmustafa.dto.route;

import com.azoudmustafa.dto.user.UserGetWithNamesDTO;

import java.time.LocalDate;

public record RouteGetOverviewDTO(
        Integer id,
        String departureAddress,
        String arrivalAddress,
        LocalDate departureDate,
        UserGetWithNamesDTO driver
) {

}
