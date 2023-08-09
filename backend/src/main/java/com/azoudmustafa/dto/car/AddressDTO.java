package com.azoudmustafa.dto.car;

import jakarta.validation.constraints.NotNull;

public record AddressDTO(
        Integer id,
        @NotNull
        String street,
        @NotNull
        String city,
        @NotNull
        String zipCode,
        @NotNull
        String country
) {
}
