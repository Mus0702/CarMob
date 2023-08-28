package com.azoudmustafa.controller.chat;

import com.azoudmustafa.model.Message;
import com.azoudmustafa.service.message.MessageService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
@RestController
public class ChatController {
    private final MessageService messageService;

    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat")
    public Message sendMessage(@Payload Message chatMessage) {
        Message savedMessage = messageService.save(chatMessage);
        simpMessagingTemplate.convertAndSendToUser(
                chatMessage.getReceiver().getId().toString(),
                "/queue/messages",
                savedMessage
        );
        return savedMessage;
    }


}
