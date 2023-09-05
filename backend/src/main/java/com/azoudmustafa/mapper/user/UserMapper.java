package com.azoudmustafa.mapper.user;

import com.azoudmustafa.dto.user.UserGetDTO;
import com.azoudmustafa.dto.user.UserGetWithNamesDTO;
import com.azoudmustafa.dto.user.UserPostDTO;
import com.azoudmustafa.dto.user.UserWithFirstnameDTO;
import com.azoudmustafa.mapper.car.CarMapper;
import com.azoudmustafa.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {CarMapper.class})
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    User toEntity(UserPostDTO userDTO);

    UserPostDTO toPostDTO(User entity);

    User toEntity(UserGetDTO userDTO);

    UserGetDTO toGetDTO(User entity);

    User toGetEntity(UserGetWithNamesDTO userDTO);

    @Mapping(source = "car", target = "car", qualifiedByName = "carToDTO")
    @Named("toGetWithNamesDTO")
    UserGetWithNamesDTO toGetWithNamesDTO(User entity);

    UserWithFirstnameDTO toGetWithFirstnameDTO(User entity);

}
