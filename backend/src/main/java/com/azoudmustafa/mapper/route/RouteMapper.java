package com.azoudmustafa.mapper.route;

import com.azoudmustafa.dto.route.RouteGetOverviewDTO;
import com.azoudmustafa.dto.route.RoutePostDTO;
import com.azoudmustafa.dto.route.RouteWithCarAndUserDTO;
import com.azoudmustafa.dto.route.RouteWithDriverDTO;
import com.azoudmustafa.dto.user.UserPostDTO;
import com.azoudmustafa.mapper.user.UserMapper;
import com.azoudmustafa.model.Route;
import com.azoudmustafa.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface RouteMapper {
    RouteMapper INSTANCE = Mappers.getMapper(RouteMapper.class);

    Route routePostDTOToEntity(RoutePostDTO routePostDTO);
    @Mapping(source = "passengers", target = "passengersDTO")
    @Mapping(source = "driver.id", target = "driverId")
    RoutePostDTO RouteEntityToRoutePostDTO(Route entity);


    Route toEntity(RouteGetOverviewDTO routeGetOverviewDTO);

    @Mapping(source = "driver", target = "driver", qualifiedByName = "toGetWithNamesDTO")
    @Mapping(source = "passengers", target = "passengersDTO")
    RouteGetOverviewDTO toDTO(Route entity);


    Route routeWithCarAndUserToEntity(RouteWithCarAndUserDTO dto);

    @Mapping(source = "driver", target = "driver", qualifiedByName = "toGetWithNamesDTO")
    RouteWithCarAndUserDTO routeEntityToDTO(Route entity);



//    Route toEntityWithDriver(RouteWithDriverDTO dto);
//    RouteWithDriverDTO toRouteDriverDTO(Route entity);
//    Route toEntityDriverDTO(RouteWithDriverDTO dto);
}
