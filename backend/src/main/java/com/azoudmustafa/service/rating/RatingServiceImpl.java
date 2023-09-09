package com.azoudmustafa.service.rating;

import com.azoudmustafa.dto.rating.RatingDTO;
import com.azoudmustafa.exceptionHandler.BadRequestException;
import com.azoudmustafa.model.Rating;
import com.azoudmustafa.model.Route;
import com.azoudmustafa.model.User;
import com.azoudmustafa.repository.rating.RatingRepository;
import com.azoudmustafa.repository.route.RouteRepository;
import com.azoudmustafa.repository.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class RatingServiceImpl implements RatingService {

    private final RatingRepository ratingRepository;
    private final RouteRepository routeRepository;
    private final UserRepository userRepository;

    @Override
    public RatingDTO save(RatingDTO dto) {

        User driver = userRepository.findById(dto.getDriverId())
                .orElseThrow(null);
        User passenger = userRepository.findById(dto.getPassengerId())
                .orElseThrow(null);
        Route route = routeRepository.findById(dto.getRouteId())
                .orElseThrow(null);

        Optional<Rating> existingRating = ratingRepository.findByPassengerAndRoute(passenger, route);

        if (existingRating.isPresent()) {
            throw new BadRequestException("Rating for this specific route and passenger already exist");
        }

        Rating savedRating = Rating.builder()
                .driver(driver)
                .passenger(passenger)
                .route(route)
                .rating(dto.getRating())
                .build();
        if (!savedRating.getRoute().getPassengers().contains(passenger)) {
            throw new BadRequestException("Passenger is not part of the passengers of this specific route");

        }
        if (savedRating != null) {
            ratingRepository.save(savedRating);
        } else {
            throw new BadRequestException("Rating object is null");
        }
        setDriverAverageRating(driver);


        return dto;
    }

    private void setDriverAverageRating(User driver) {
        List<Rating> ratings = ratingRepository.findByDriverId(driver.getId());
        Double totalRating = 0D;
        if (!ratings.isEmpty()) {
            for (Rating rating : ratings) {
                totalRating += rating.getRating();
            }
            Double driverAverageRating = totalRating / ratings.size();
            driver.setRating(driverAverageRating);
            userRepository.save(driver);
        }

    }
}
