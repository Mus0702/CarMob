package com.azoudmustafa.service.user;

import com.azoudmustafa.dto.user.UserGetDTO;
import com.azoudmustafa.model.User;

public interface UserService {
    User save(User user);
    UserGetDTO getById(Integer id);
    UserGetDTO getByMail(String mail);
    boolean existsByEmail(String email);
}
