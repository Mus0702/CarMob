package com.azoudmustafa.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotNull
    private String brand;
    @NotNull
    private String model;
    @NotNull
    @Min(1)
    @Max(6)
    @Column(name = "number_available_seat")
    private int numberAvailableSeat;
    private String color;
}
