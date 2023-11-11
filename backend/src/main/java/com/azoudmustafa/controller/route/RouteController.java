package com.azoudmustafa.controller.route;

import com.azoudmustafa.dto.route.RouteGetOverviewDTO;
import com.azoudmustafa.dto.route.RoutePostDTO;
import com.azoudmustafa.model.Route;
import com.azoudmustafa.service.route.RouteService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/route")
@CrossOrigin(origins = "http://localhost:5173")
public class RouteController {
    private final RouteService routeService;

    @PostMapping
    public ResponseEntity<RoutePostDTO> createOrUpdate(@Valid @RequestBody RoutePostDTO dto) {
        return new ResponseEntity<>(routeService.save(dto), HttpStatus.CREATED);
    }
    @GetMapping("/search")
    public ResponseEntity<Page<RouteGetOverviewDTO>> searchRoutes(
            @RequestParam String departureAddress,
            @RequestParam String arrivalAddress,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate departureDate,
            @RequestParam Integer numberOfSeats,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "20") Integer size

    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<RouteGetOverviewDTO> routes = routeService.findAllBy(
                departureAddress,
                arrivalAddress,
                departureDate,
                numberOfSeats,
                pageable
        );

        return ResponseEntity.ok(routes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RouteGetOverviewDTO> getById(@PathVariable Integer id) {
        return new ResponseEntity<>(routeService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/notAuth/{id}")
    public ResponseEntity<RouteGetOverviewDTO> getByIdNotAuth(@PathVariable Integer id) {
        return new ResponseEntity<>(routeService.findById(id), HttpStatus.OK);
    }
    @GetMapping("/routes/{userId}")
    public ResponseEntity<List<RoutePostDTO>> getRoutesForUser(@PathVariable Integer userId) {
        List<RoutePostDTO> routes = routeService.getRoutesForUser(userId);
        return new ResponseEntity<>(routes, HttpStatus.OK);
    }

    @PutMapping("cancel/{routeId}")
    public ResponseEntity<Route> cancelRouteAsDriver(@PathVariable Integer routeId) {
        Route cancelledRoute = routeService.cancelRouteAsDriver(routeId);
        return ResponseEntity.ok(cancelledRoute);
    }

    @PutMapping("cancelAsPassenger/{routeId}/{passengerId}")
    public ResponseEntity<?> cancelRouteAsPassenger(@PathVariable Integer routeId, @PathVariable Integer passengerId) {
        routeService.cancelRouteAsPassenger(routeId, passengerId);
        return ResponseEntity.ok().body("Cancelled successfully as passenger");
    }

}
