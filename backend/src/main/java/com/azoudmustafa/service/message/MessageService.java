package com.azoudmustafa.service.message;

import com.azoudmustafa.dto.message.MessageDTO;
import com.azoudmustafa.model.Message;

public interface MessageService {

    Message save(MessageDTO messageDTO);
}
