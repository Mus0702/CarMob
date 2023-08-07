package com.azoudmustafa.mapper.user;

import com.azoudmustafa.dto.user.UserGetDTO;
import com.azoudmustafa.dto.user.UserPostDTO;
import com.azoudmustafa.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    User toEntity(UserPostDTO userDTO);

    UserPostDTO toPostDTO(User entity);

    User toEntity(UserGetDTO userDTO);

    UserGetDTO toGetDTO(User entity);


}
