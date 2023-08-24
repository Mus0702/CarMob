package com.azoudmustafa.dto.car;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
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
