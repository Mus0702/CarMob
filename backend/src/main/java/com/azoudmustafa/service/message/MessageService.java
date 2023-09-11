package com.azoudmustafa.service.message;

import com.azoudmustafa.dto.message.MessageDTO;
import com.azoudmustafa.dto.message.MessageGetListDTO;
import com.azoudmustafa.model.Message;

import java.util.List;

public interface MessageService {

    Message save(MessageDTO messageDTO);
    List<MessageGetListDTO> findAllByRouteAndUser(Integer routeId, Integer user1Id, Integer User2Id);
}
