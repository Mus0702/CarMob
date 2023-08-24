package com.azoudmustafa.mapper.car;

import com.azoudmustafa.dto.car.CarDTO;
import com.azoudmustafa.dto.route.RouteGetOverviewDTO;
import com.azoudmustafa.mapper.route.RouteMapper;
import com.azoudmustafa.model.Car;
import com.azoudmustafa.model.Route;
import jdk.jfr.Name;
import org.mapstruct.Mapper;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CarMapper {
    CarMapper INSTANCE = Mappers.getMapper(CarMapper.class);

    Car toEntity(CarDTO carDTO);

    @Named("carToDTO")
    CarDTO toDTO(Car entity);
}
