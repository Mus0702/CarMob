package com.azoudmustafa.mapper;

import com.azoudmustafa.dto.booking.BookingDTO;
import com.azoudmustafa.dto.rating.RatingDTO;
import com.azoudmustafa.mapper.route.RouteMapper;
import com.azoudmustafa.mapper.user.UserMapper;
import com.azoudmustafa.model.Booking;
import com.azoudmustafa.model.Rating;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring",uses = {UserMapper.class, RouteMapper.class})
public interface RatingMapper {

    RatingMapper INSTANCE = Mappers.getMapper(RatingMapper.class);

    Rating toEntity(RatingDTO dto);
    RatingDTO toDTO(Rating entity);

}
