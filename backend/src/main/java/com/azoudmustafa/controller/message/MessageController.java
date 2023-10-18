package com.azoudmustafa.controller.message;

import com.azoudmustafa.dto.message.MessageGetListDTO;
import com.azoudmustafa.model.Message;
import com.azoudmustafa.service.message.MessageService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/message")
public class MessageController {
    private final MessageService messageService;

    @PutMapping
    public ResponseEntity<Message> saveMessage(@RequestBody MessageGetListDTO messageDTO) {
        return new ResponseEntity<>(messageService.updateStatus(messageDTO), HttpStatus.CREATED);
    }
}
