package com.azoudmustafa.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Route {

    private Integer id;
//    private Address departureAddress;
//    private Address arrivalAddress;
    private LocalDate departureDate;
    private int passengerNumber;

//    private Car car;

    private int Price;


}
