package com.azoudmustafa.service.user;

import com.azoudmustafa.model.User;
import com.azoudmustafa.repository.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {

   private final UserRepository userRepository;

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getById(Integer id) {
        return userRepository.findById(id).orElseThrow(()
                -> new EntityNotFoundException("User with id " + id + " not found"));
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
