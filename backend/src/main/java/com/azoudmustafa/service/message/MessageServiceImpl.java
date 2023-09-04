package com.azoudmustafa.service.message;

import com.azoudmustafa.dto.message.MessageDTO;
import com.azoudmustafa.mapper.message.MessageMapper;
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


    public Message save(MessageDTO messageDTO) {
        Message messageEntity = MessageMapper.INSTANCE.messageDtoToMessage(messageDTO);
        return messageRepository.save(messageEntity);
    }

}
