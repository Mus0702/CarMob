package com.azoudmustafa.service.route;

import com.azoudmustafa.dto.route.RouteGetOverviewDTO;
import com.azoudmustafa.dto.route.RoutePostDTO;
import com.azoudmustafa.dto.route.RouteWithCarAndUserDTO;
import com.azoudmustafa.model.Route;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface RouteService {
    Page<RouteGetOverviewDTO> findAllBy(String departureAddress,
                                        String arrivalAddress,
                                        LocalDate departureDate,
                                        Integer availableSeat,
                                        Pageable pageable);

    RouteGetOverviewDTO findById(Integer id);

    RoutePostDTO save(RoutePostDTO dto);
    List<RoutePostDTO> getRoutesForUser(Integer userId);
}
