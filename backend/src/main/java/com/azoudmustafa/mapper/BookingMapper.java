package com.azoudmustafa.mapper;

import com.azoudmustafa.dto.booking.BookingDTO;
import com.azoudmustafa.mapper.route.RouteMapper;
import com.azoudmustafa.mapper.user.UserMapper;
import com.azoudmustafa.model.Booking;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring",uses = {RouteMapper.class, UserMapper.class})
public interface BookingMapper {

    BookingMapper INSTANCE = Mappers.getMapper(BookingMapper.class);

    Booking toEntity(BookingDTO bookingDTO);
    BookingDTO toDTO(Booking entity);

}
