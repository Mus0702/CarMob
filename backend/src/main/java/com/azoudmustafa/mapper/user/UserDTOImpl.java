package com.azoudmustafa.mapper.user;

import com.azoudmustafa.dto.user.UserGetDTO;
import com.azoudmustafa.dto.user.UserPostDTO;
import com.azoudmustafa.model.User;

public class UserDTOImpl implements UserMapper {

    @Override
    public User toEntity(UserPostDTO userDTO) {

        return userDTO == null ? null : UserMapper.INSTANCE.toEntity(userDTO);

    }

    @Override
    public UserPostDTO toPostDTO(User entity) {
        return entity == null ? null : UserMapper.INSTANCE.toPostDTO(entity);
    }

    @Override
    public User toEntity(UserGetDTO userDTO) {
        return null;
    }

    @Override
    public UserGetDTO toGetDTO(User entity) {
        return null;
    }
}
