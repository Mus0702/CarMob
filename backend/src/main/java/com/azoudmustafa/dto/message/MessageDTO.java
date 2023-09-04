package com.azoudmustafa.dto.message;

import com.azoudmustafa.dto.route.RouteWithCarAndUserDTO;
import com.azoudmustafa.dto.user.UserWithFirstnameDTO;
import com.azoudmustafa.model.Route;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor
public class MessageDTO {
    private Integer id;
    @NotNull
    private Integer routeId;
    @NotNull
    private Integer senderId;
    @NotNull
    private Integer receiverId;
    @NotNull
    private String content;
}
