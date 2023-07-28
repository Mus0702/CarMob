package com.azoudmustafa.controller.user;


import com.azoudmustafa.dto.user.UserGetDTO;
import com.azoudmustafa.mapper.user.UserMapper;
import com.azoudmustafa.model.User;
import com.azoudmustafa.service.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserMapper userMapper;
    private final UserService userService;


    @GetMapping("/{id}")
    public ResponseEntity<UserGetDTO> getUserById(@PathVariable(value = "id") Integer id) {
        return new ResponseEntity<>(
                userMapper.toGetDTO(userService.getById(id)
                        ),
                HttpStatus.OK

        );
    }


}
