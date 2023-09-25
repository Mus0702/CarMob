package com.azoudmustafa.model;

import com.azoudmustafa.enums.RouteStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.locationtech.jts.geom.Point;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotNull
    @Column(name = "departure_date")
    private LocalDate departureDate;
    @NotNull
    @Column(name = "departure_time")
    private LocalTime departureTime;
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


    @Column(name = "departure_location", columnDefinition = "geography(Point, 4326)")
    @NotNull
    private Point departureLocation;

    @Column(name = "arrival_location", columnDefinition = "geography(Point, 4326)")
    @NotNull
    private Point arrivalLocation;
    @Enumerated(EnumType.STRING)
    private RouteStatus status;

    public Route(Integer id) {
        this.id = id;
    }

}
