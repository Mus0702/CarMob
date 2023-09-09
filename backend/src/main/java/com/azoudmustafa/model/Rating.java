package com.azoudmustafa.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "driver_id")
    private User driver;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "passenger_id")
    private User passenger;
    @ManyToOne
    @JoinColumn(name = "route_id")
    private Route route;
    @NotNull
    @Min(1)
    @Max(5)
    private Integer rating;

}
