package com.azoudmustafa.controller.route;

import com.azoudmustafa.dto.route.RouteGetOverviewDTO;
import com.azoudmustafa.model.Route;
import com.azoudmustafa.repository.RouteRepository;
import com.azoudmustafa.service.route.RouteService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@AllArgsConstructor
@RestController
@RequestMapping("/route")
@CrossOrigin(origins = "http://localhost:5173")
public class RouteController {
    private final RouteService routeService;

    @GetMapping("/search")
    public ResponseEntity<Page<RouteGetOverviewDTO>> searchRoutes(
            @RequestParam(required = false) String departureAddress,
            @RequestParam(required = false) String arrivalAddress,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate departureDate,
            @RequestParam(required = false) Integer numberOfSeats,
            Pageable pageable
    ) {
        Page<RouteGetOverviewDTO> routes = routeService.findAllBy(
                departureAddress,
                arrivalAddress,
                departureDate,
                numberOfSeats,
                pageable
        );

        return ResponseEntity.ok(routes);
    }
}
