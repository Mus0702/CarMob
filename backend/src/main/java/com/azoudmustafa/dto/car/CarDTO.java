package com.azoudmustafa.dto.car;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class CarDTO {
    private Integer id;
    @NotNull
    private String brand;
    @NotNull
    private String model;
    @NotNull
    @Min(1)
    @Max(6)
    private int numberAvailableSeat;
    private String color;
}
