package com.azoudmustafa.service.rating;

import com.azoudmustafa.dto.rating.RatingDTO;
import com.azoudmustafa.model.Route;
import com.azoudmustafa.model.User;

public interface RatingService {

    RatingDTO save(RatingDTO dto);
    Boolean hasUserRatedDriverForRoute(Integer routeId, Integer driverId, Integer passengerId);
}
