package com.azoudmustafa.service.route;

import com.azoudmustafa.dto.route.RouteGetOverviewDTO;
import com.azoudmustafa.mapper.route.RouteMapper;
import com.azoudmustafa.model.Route;
import com.azoudmustafa.repository.RouteRepository;
import com.azoudmustafa.service.geocoding.GoogleGeocodingService;
import com.google.maps.model.LatLng;
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
    private final GoogleGeocodingService googleGeocodingService;

    @Override
    public Page<RouteGetOverviewDTO> findAllBy(String selectedDepartureAddress,
                                               String arrivalAddress,
                                               LocalDate departureDate,
                                               Integer availableSeat,
                                               Pageable pageable) {
        LatLng results = googleGeocodingService.getLatLngFromAddress(selectedDepartureAddress);
        Page<Route> routes = routeRepository.findAllBy(results.lat, results.lng, arrivalAddress, departureDate, availableSeat, pageable);

        return routes.map(routeMapper::toDTO);
    }


}
