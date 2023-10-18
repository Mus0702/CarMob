package com.azoudmustafa.controller.rating;

import com.azoudmustafa.dto.rating.RatingDTO;
import com.azoudmustafa.service.rating.RatingService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/rating")
@RestController
public class RatingController {
    private final RatingService ratingService;

    @PostMapping
    public ResponseEntity<RatingDTO> createOrUpdate(@Valid @RequestBody RatingDTO dto) {
        return new ResponseEntity<>(ratingService.save(dto), HttpStatus.CREATED);
    }

    @GetMapping("/hasRated")
    public ResponseEntity<?> hasUserRatedRoute(@RequestParam Integer routeId, @RequestParam Integer driverId, @RequestParam Integer passengerId) {
        boolean hasRated = ratingService.hasUserRatedDriverForRoute(routeId, driverId, passengerId);
        return ResponseEntity.ok().body(hasRated);
    }
}
