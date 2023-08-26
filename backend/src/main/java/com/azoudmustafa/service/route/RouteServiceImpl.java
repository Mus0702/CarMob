package com.azoudmustafa.service.route;

import com.azoudmustafa.dto.route.RouteGetOverviewDTO;
import com.azoudmustafa.dto.route.RouteWithCarAndUserDTO;
import com.azoudmustafa.mapper.route.RouteMapper;
import com.azoudmustafa.mapper.user.UserMapper;
import com.azoudmustafa.model.Route;
import com.azoudmustafa.repository.RouteRepository;
import com.azoudmustafa.service.geocoding.GoogleDistanceService;
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
    private final UserMapper userMapper;
    private final GoogleGeocodingService googleGeocodingService;
    private final GoogleDistanceService googleDistanceService;

    @Override
    public Page<RouteGetOverviewDTO> findAllBy(String selectedDepartureAddress,
                                               String selectedArrivalAddress,
                                               LocalDate departureDate,
                                               Integer availableSeat,
                                               Pageable pageable) {

        LatLng departureResults = googleGeocodingService.getLatLngFromAddress(selectedDepartureAddress);
        LatLng arrivalResults = googleGeocodingService.getLatLngFromAddress(selectedArrivalAddress);

        Page<Route> routes = routeRepository.findAllBy(
                departureResults.lat, departureResults.lng,
                arrivalResults.lat, arrivalResults.lng,
                departureDate,
                availableSeat,
                pageable);

        return routes.map(route -> {
            RouteGetOverviewDTO dto = routeMapper.toDTO(route);
            try {
                double distanceInMeters = googleDistanceService.getDistanceBetweenAddresses(
                        selectedDepartureAddress,
                        route.getDepartureAddress()
                );
                dto.setDistance(distanceInMeters);
            } catch (Exception e) {
                e.printStackTrace();

            }
            return dto;
        });
    }

    @Override
    public RouteWithCarAndUserDTO findById(Integer id) {
        Route route = routeRepository.findById(id).orElse(null);
        return routeMapper.routeEntityToDTO(route);
    }


}
