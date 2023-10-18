package com.azoudmustafa.dto.route;

import com.azoudmustafa.dto.user.UserGetWithNamesDTO;
import com.azoudmustafa.dto.user.UserWithFirstnameDTO;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class RouteGetOverviewDTO {
    private Integer id;
    private String departureAddress;
    private String arrivalAddress;
    private LocalDate departureDate;
    private LocalTime departureTime;
    private UserGetWithNamesDTO driver;
    private Double distance;
    private Double routePrice;
    private List<UserWithFirstnameDTO> passengersDTO;
}
