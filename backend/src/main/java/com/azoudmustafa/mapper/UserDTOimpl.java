package com.azoudmustafa.mapper;

import com.azoudmustafa.dto.UserPostDTO;
import com.azoudmustafa.model.User;

public class UserDTOimpl implements GenericMapper<User, UserPostDTO> {

    @Override
    public User toEntity(UserPostDTO userDTO) {
        if (userDTO == null) {
            return null;
        }

        User user = new User();
        user.setId(userDTO.id());
        user.setLastname(userDTO.lastname());
        user.setFirstname(userDTO.firstname());
        user.setPassword(userDTO.password());
        user.setBirthdate(userDTO.birthdate());
        user.setPhoneNumber(userDTO.phoneNumber());

        return user;
    }

    @Override
    public UserPostDTO toDTO(User entity) {
        return null;
    }
}
