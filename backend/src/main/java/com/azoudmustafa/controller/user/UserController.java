package com.azoudmustafa.controller.user;


import com.azoudmustafa.dto.user.UserGetDTO;
import com.azoudmustafa.mapper.user.UserMapper;
import com.azoudmustafa.service.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserGetDTO> getUserById(@PathVariable(value = "id") Integer id) {
        return new ResponseEntity<>(userService.getById(id),
                HttpStatus.OK
        );
    }

    @GetMapping("getUser/{mail}")
    public ResponseEntity<UserGetDTO> getUserByMail(@PathVariable(value = "mail") String mail) {
        return new ResponseEntity<>(
                userService.getByMail(mail)
                ,
                HttpStatus.OK
        );
    }

    @GetMapping("/check-email")
    public ResponseEntity<String> checkEmailExists(@RequestParam String email) {
        if (userService.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        } else {
            return ResponseEntity.ok("Email is available");
        }
    }
}
