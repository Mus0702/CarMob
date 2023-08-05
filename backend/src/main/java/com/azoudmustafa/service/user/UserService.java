package com.azoudmustafa.service.user;

import com.azoudmustafa.model.User;

public interface UserService {
    User save(User user);
    User getById(Integer id);
    boolean existsByEmail(String email);
}
