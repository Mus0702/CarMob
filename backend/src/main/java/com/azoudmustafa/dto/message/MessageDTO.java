package com.azoudmustafa.dto.message;

import com.azoudmustafa.dto.route.RouteWithCarAndUserDTO;
import com.azoudmustafa.dto.user.UserWithFirstnameDTO;
import com.azoudmustafa.model.Route;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@AllArgsConstructor
@Data
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
//    private LocalDateTime timestamp;
    private ZonedDateTime timestamp=  LocalDateTime.now().atZone(ZoneId.of("UTC"));

    private Boolean isRead;


}
