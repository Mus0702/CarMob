package com.azoudmustafa.dto.message;

import com.azoudmustafa.dto.route.RouteWithDriverDTO;
import com.azoudmustafa.dto.user.UserWithFirstnameDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class MessageGetListDTO {
    private Integer id;
    private RouteWithDriverDTO route;

    private UserWithFirstnameDTO sender;
    private UserWithFirstnameDTO receiver;
    private String content;
}
