package com.azoudmustafa.service.route;

import com.azoudmustafa.dto.route.RouteGetOverviewDTO;
import com.azoudmustafa.model.Route;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface RouteService {
    Page<RouteGetOverviewDTO> findAllBy(Integer departureAddressId, Integer arrivalAddressId, LocalDate departureDate, Integer availableSeat, Pageable pageable);
}
