package com.azoudmustafa.mapper.route;

import com.azoudmustafa.dto.route.RouteGetOverviewDTO;
import com.azoudmustafa.dto.user.UserPostDTO;
import com.azoudmustafa.mapper.user.UserMapper;
import com.azoudmustafa.model.Route;
import com.azoudmustafa.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface RouteMapper {
    RouteMapper INSTANCE = Mappers.getMapper(RouteMapper.class);

    Route toEntity(RouteGetOverviewDTO routeGetOverviewDTO);

    RouteGetOverviewDTO toDTO(Route entity);
}
