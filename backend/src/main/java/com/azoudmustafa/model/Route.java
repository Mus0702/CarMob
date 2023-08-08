package com.azoudmustafa.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
    @NotNull
    @ManyToOne
    @JoinColumn(name = "departure_address_id")
    private Address departureAddress;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "arrival_address_id")
    private Address arrivalAddress;
    @NotNull
    @Column(name = "departure_date")
    private LocalDate departureDate;
    @Column(name = "passenger_number")
    private int passengerNumber;
    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;
    @NotNull
    @Column(name = "route_price")
    private double routePrice;


}
