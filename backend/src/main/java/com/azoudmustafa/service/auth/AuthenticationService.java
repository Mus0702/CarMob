package com.azoudmustafa.service.auth;


import com.azoudmustafa.controller.auth.AuthenticationRequest;
import com.azoudmustafa.controller.auth.AuthenticationResponse;
import com.azoudmustafa.controller.auth.RegisterRequest;
import com.azoudmustafa.dto.user.UserPostDTO;
import com.azoudmustafa.enums.Role;
import com.azoudmustafa.mapper.user.UserMapper;
import com.azoudmustafa.model.User;
import com.azoudmustafa.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userAppRepository;
    private final UserMapper userMapper;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var userPostDTO = UserPostDTO.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .birthdate(request.getBirthdate())
                .phoneNumber(request.getPhoneNumber())
                .role(Role.ROLE_USER)
                .build();
        userAppRepository.save(userMapper.toEntity(userPostDTO));

        var jwtToken = jwtService.generateToken(userMapper.toEntity(userPostDTO));

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse login(AuthenticationRequest request) {

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = userAppRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        var role = user.getRole();
        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .role(role)
                .build();

    }
}
