package com.azoudmustafa.service.route;

import com.azoudmustafa.dto.route.RouteGetOverviewDTO;
import com.azoudmustafa.dto.route.RoutePostDTO;
import com.azoudmustafa.exceptionHandler.BadRequestException;
import com.azoudmustafa.mapper.route.RouteMapper;
import com.azoudmustafa.mapper.user.UserMapper;
import com.azoudmustafa.model.Route;
import com.azoudmustafa.model.User;
import com.azoudmustafa.repository.route.RouteRepository;
import com.azoudmustafa.repository.user.UserRepository;
import com.azoudmustafa.service.geocoding.GoogleDistanceService;
import com.azoudmustafa.service.geocoding.GoogleGeocodingService;
import com.google.maps.model.LatLng;
import lombok.AllArgsConstructor;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@AllArgsConstructor
@Service
public class RouteServiceImpl implements RouteService {
    private final RouteRepository routeRepository;
    private final RouteMapper routeMapper;
    private final UserRepository userRepository;
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

    public RoutePostDTO save(RoutePostDTO dto) {
        Route route = RouteMapper.INSTANCE.routePostDTOToEntity(dto);
        User driver = userRepository.findById(dto.getDriverId()).orElseThrow(null);

        if (dto.getAvailableSeat() > driver.getCar().getNumberAvailableSeat()) {
            throw new BadRequestException("The route number of available seats cannot exceed the car number of available seats");

        }

        route.setDriver(driver);


        int srid = 4326;
        GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), srid);

        LatLng departureResults = googleGeocodingService.getLatLngFromAddress(dto.getDepartureAddress());
        Point departuPoint = geometryFactory.createPoint(new Coordinate(departureResults.lng, departureResults.lat));
        if (departureResults == null) {
            throw new BadRequestException("the departure address you've specified doesn't exist");
        }
        LatLng arrivalResults = googleGeocodingService.getLatLngFromAddress(dto.getArrivalAddress());
        Point arrivalPoint = geometryFactory.createPoint(new Coordinate(arrivalResults.lng, arrivalResults.lat));
        if (arrivalResults == null) {
            throw new BadRequestException("the arrival address you've specified doesn't exist");
        }
        route.setDepartureLocation(departuPoint);
        route.setArrivalLocation(arrivalPoint);

        routeRepository.save(route);
        return dto;
    }

    @Override
    public RouteGetOverviewDTO findById(Integer id) {
        Route route = routeRepository.findById(id).orElse(null);
        return routeMapper.toDTO(route);
    }


}
