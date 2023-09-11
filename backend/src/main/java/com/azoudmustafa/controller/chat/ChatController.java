package com.azoudmustafa.controller.chat;

import com.azoudmustafa.dto.message.MessageDTO;
import com.azoudmustafa.dto.message.MessageGetListDTO;
import com.azoudmustafa.model.Message;
import com.azoudmustafa.service.message.MessageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ChatController {

    private final MessageService messageService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    public ChatController(MessageService messageService, SimpMessagingTemplate simpMessagingTemplate) {
        this.messageService = messageService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    @MessageMapping("/chat")
    public Message sendMessage(@Payload MessageDTO chatMessageDTO) {
        logger.info("message recu " + chatMessageDTO.toString());
        Message savedMessage = messageService.save(chatMessageDTO);
        logger.info("message envoyé " + savedMessage.toString());

        simpMessagingTemplate.convertAndSend("/user/" + chatMessageDTO.getReceiverId().toString() + "/private", savedMessage);
        return savedMessage;
    }

    @GetMapping("/conversation")
    public ResponseEntity<List<MessageGetListDTO>> getMessageByRouteAndUsers(@RequestParam("routeId") Integer routeId,
                                                                             @RequestParam("user1Id") Integer user1Id,
                                                                             @RequestParam("user2Id") Integer user2Id) {
        List<MessageGetListDTO> messages = messageService.findAllByRouteAndUser(routeId, user1Id, user2Id);

        if (messages.isEmpty()){
            return new ResponseEntity<>(messages, HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }


}
