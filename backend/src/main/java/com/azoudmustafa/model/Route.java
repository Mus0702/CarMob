package com.azoudmustafa.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.locationtech.jts.geom.Point;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
//    @NotNull
//    @ManyToOne
//    @JoinColumn(name = "departure_address_id")
//    private Address departureAddress;
    //    @NotNull
//    @ManyToOne
//    @JoinColumn(name = "arrival_address_id")
//    private Address arrivalAddress;
    @NotNull
    @Column(name = "departure_date")
    private LocalDate departureDate;
    @Column(name = "departure_address")
    private String departureAddress;
    @Column(name = "arrival_address")
    private String arrivalAddress;

    @Column(name = "available_seat")
    private int availableSeat;
    @ManyToOne
    @JoinColumn(name = "driver_id")
    private User driver;
    @ManyToMany
    @JoinTable(
            name = "route_passenger",
            joinColumns = @JoinColumn(name = "route_id"),
            inverseJoinColumns = @JoinColumn(name = "passenger_id")
    )
    private Set<User> passengers;
    @NotNull
    @Column(name = "route_price")
    private double routePrice;


    @Column(name = "departure_location", columnDefinition = "POINT")
    @NotNull
    private Point departureLocation;



}
