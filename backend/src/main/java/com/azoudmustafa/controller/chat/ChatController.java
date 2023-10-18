package com.azoudmustafa.controller.chat;

import com.azoudmustafa.dto.message.MessageGetListDTO;
import com.azoudmustafa.model.Message;
import com.azoudmustafa.service.message.MessageService;
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

    @MessageMapping("/chat")
    public Message sendMessage(@Payload MessageGetListDTO chatMessageDTO) {
        Message savedMessage = messageService.save(chatMessageDTO);

        simpMessagingTemplate.convertAndSend("/user/" + chatMessageDTO.getReceiver().getId().toString() + "/private", savedMessage);
        sendNotification(chatMessageDTO.getReceiver().getId(),savedMessage);
        return savedMessage;
    }
    public void sendNotification(Integer userId,Message chatMessage) {
        simpMessagingTemplate.convertAndSend("/user/" + userId.toString() + "/notifications", chatMessage );
    }

    @GetMapping("/conversation")
    public ResponseEntity<List<MessageGetListDTO>> getMessageByRouteAndUsers(@RequestParam("routeId") Integer routeId,
                                                                             @RequestParam("user1Id") Integer user1Id,
                                                                             @RequestParam("user2Id") Integer user2Id) {
        List<MessageGetListDTO> messages = messageService.findAllByRouteAndUser(routeId, user1Id, user2Id);

        if (messages.isEmpty()) {
            return new ResponseEntity<>(messages, HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @GetMapping("/notifications/allUnreadMessages")
    public ResponseEntity<List<MessageGetListDTO>> getAllUnreadMessages(@RequestParam("receiverId") Integer receiverId) {
        return new ResponseEntity<>(messageService.findAllUnreadMessagesByUserId(receiverId), HttpStatus.OK);
    }

    @GetMapping("/notifications/privateUnreadMessages")
    public ResponseEntity<List<MessageGetListDTO>> getPrivateUnreadMessages(
            @RequestParam("senderId") Integer senderId,
            @RequestParam("receiverId") Integer receiverId,
            @RequestParam("routeId") Integer routeId) {
        return new ResponseEntity<>(messageService.findAllMessageFromSenderId(senderId, receiverId, routeId), HttpStatus.OK);
    }

}
