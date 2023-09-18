package com.azoudmustafa.service.user;

import com.azoudmustafa.dto.user.UserGetDTO;
import com.azoudmustafa.mapper.user.UserMapper;
import com.azoudmustafa.model.User;
import com.azoudmustafa.repository.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public UserGetDTO getById(Integer id) {
        User user= userRepository.findById(id).orElseThrow(()
                -> new EntityNotFoundException("User with id " + id + " not found"));

        return userMapper.toGetDTO(user);
    }

    @Override
    public UserGetDTO getByMail(String mail) {
        User user = userRepository.findByEmail(mail).orElse(null);
        return userMapper.toGetDTO(user);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
