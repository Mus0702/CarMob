package com.azoudmustafa.repository.rating;

import com.azoudmustafa.model.Rating;
import com.azoudmustafa.model.Route;
import com.azoudmustafa.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RatingRepository extends JpaRepository<Rating, Integer> {
    @Query("select r from Rating r where r.passenger = :passenger and r.route = :route")
    Optional<Rating> findByPassengerAndRoute(
            @Param("passenger") User passenger,
            @Param("route") Route route);

    List<Rating> findByDriverId(Integer DriverId);
}
