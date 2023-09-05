package com.azoudmustafa.service.route;

import com.azoudmustafa.dto.route.RouteGetOverviewDTO;
import com.azoudmustafa.dto.route.RouteWithCarAndUserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface RouteService {
    Page<RouteGetOverviewDTO> findAllBy(String departureAddress,
                                        String arrivalAddress,
                                        LocalDate departureDate,
                                        Integer availableSeat,
                                        Pageable pageable);

    RouteGetOverviewDTO findById(Integer id);
}
