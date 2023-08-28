package com.azoudmustafa.service.message;

import com.azoudmustafa.model.Message;
import com.azoudmustafa.repository.message.MessageRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Getter
@Setter
public class MessageServiceImpl implements MessageService {
    @Autowired
    private final MessageRepository messageRepository;


    public Message save(Message message) {
        return messageRepository.save(message);
    }
}
