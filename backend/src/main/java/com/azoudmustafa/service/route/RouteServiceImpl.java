package com.azoudmustafa.service.route;

import com.azoudmustafa.dto.route.RouteGetOverviewDTO;
import com.azoudmustafa.mapper.route.RouteMapper;
import com.azoudmustafa.model.Route;
import com.azoudmustafa.repository.RouteRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@AllArgsConstructor
@Service
public class RouteServiceImpl implements RouteService {
    private final RouteRepository routeRepository;
    private final RouteMapper routeMapper;


    @Override
    public Page<RouteGetOverviewDTO> findAllBy(Integer departureAddressId,
                                               Integer arrivalAddressId,
                                               LocalDate departureDate,
                                               Integer availableSeat,
                                               Pageable pageable) {
        Page<Route> routes= routeRepository.findAllBy(departureAddressId, arrivalAddressId, departureDate, availableSeat, pageable);

        return routes.map(routeMapper::toDTO);
    }
}
