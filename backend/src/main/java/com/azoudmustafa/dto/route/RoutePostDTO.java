package com.azoudmustafa.dto.route;

import com.azoudmustafa.dto.user.UserGetWithNamesDTO;
import com.azoudmustafa.dto.user.UserWithFirstnameDTO;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor
public class RoutePostDTO {
    private Integer id;
    @NotNull
    private String departureAddress;
    @NotNull
    private String arrivalAddress;
    @NotNull
    private LocalDate departureDate;
    @NotNull
    private LocalTime departureTime;
    @NotNull
    private Integer driverId;
    @NotNull
    @Min(1)
    @Max(6)
    private Integer availableSeat;
    private Double distance;
    @NotNull
    private Double routePrice;
    private List<UserWithFirstnameDTO> passengersDTO;


}
