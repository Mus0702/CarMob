package com.azoudmustafa.dto.message;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private ZonedDateTime timestamp=  LocalDateTime.now().atZone(ZoneId.of("UTC"));
    private Boolean isRead;
}
