package com.azoudmustafa.dto.route;

import com.azoudmustafa.dto.user.UserGetWithNamesDTO;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class RouteGetOverviewDTO {

    private Integer id;
    private String departureAddress;
    private String arrivalAddress;
    private LocalDate departureDate;
    private LocalTime departureTime;
    private UserGetWithNamesDTO driver;
    private Double distance;

}
