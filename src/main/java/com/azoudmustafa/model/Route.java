package com.azoudmustafa.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    //    private Address departureAddress;
//    private Address arrivalAddress;
    @Column(name = "departure_date")
    private LocalDate departureDate;
    @Column(name = "passenger_number")
    private int passengerNumber;

    //    private Car car;
    @Column(name = "route_price")
    private int routePrice;


}
