package com.azoudmustafa.dto.rating;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RatingDTO {
    private Integer id;
    @NotNull
    private Integer routeId;
    @NotNull
    private Integer passengerId;
    @NotNull
    private Integer driverId;
    @NotNull
    @Min(1)
    @Max(5)
    private Integer rating;
}
