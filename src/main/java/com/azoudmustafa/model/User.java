package com.azoudmustafa.model;

import com.azoudmustafa.enums.Role;
import lombok.*;

import java.time.LocalDate;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Integer id;
    private String lastname;
    private String firstname;
    private  String password;
    private LocalDate birthday;
    private String phoneNumber;
    private Role role;


}
