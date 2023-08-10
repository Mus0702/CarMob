package com.azoudmustafa.service.route;

import com.azoudmustafa.dto.route.RouteGetOverviewDTO;
import com.azoudmustafa.geocoding.GeoCodingResponse;
import com.azoudmustafa.mapper.route.RouteMapper;
import com.azoudmustafa.model.Route;
import com.azoudmustafa.repository.RouteRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDate;

@AllArgsConstructor
@Service
public class RouteServiceImpl implements RouteService {
    private final RouteRepository routeRepository;
    private final RouteMapper routeMapper;
    @Value("${google.maps.api.key}")
    private String googleMapsApiKey;

    @Override
    public Page<RouteGetOverviewDTO> findAllBy(String departureAddress,
                                               String arrivalAddress,
                                               LocalDate departureDate,
                                               Integer availableSeat,
                                               Pageable pageable) {
        Page<Route> routes= routeRepository.findAllBy(departureAddress, arrivalAddress, departureDate, availableSeat, pageable);

        return routes.map(routeMapper::toDTO);
    }
    private double[] convertAddressToCoordinates(String address) {
        RestTemplate restTemplate = new RestTemplate();

        String url = UriComponentsBuilder.fromHttpUrl("https://maps.googleapis.com/maps/api/geocode/json")
                .queryParam("address", address)
                .queryParam("key", googleMapsApiKey)
                .toUriString();

        GeoCodingResponse response = restTemplate.getForObject(url, GeoCodingResponse.class);

        if (response != null && response.getResults() != null && !response.getResults().isEmpty()) {
            GeoCodingResult result = response.getResults().get(0);
            if (result.getGeometry() != null && result.getGeometry().getLocation() != null) {
                return new double[]{result.getGeometry().getLocation().getLat(), result.getGeometry().getLocation().getLng()};
            }
        }

        throw new RuntimeException("Unable to convert address to coordinates.");
    }
}
