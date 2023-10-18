package com.azoudmustafa.service.message;

import com.azoudmustafa.dto.message.MessageGetListDTO;
import com.azoudmustafa.model.Message;

import java.util.List;

public interface MessageService {

    Message save(MessageGetListDTO messageDTO);

    List<MessageGetListDTO> findAllByRouteAndUser(Integer routeId, Integer user1Id, Integer User2Id);

    List<MessageGetListDTO> findAllUnreadMessagesByUserId(Integer receiverId);

    List<MessageGetListDTO> findAllMessageFromSenderId(Integer senderId, Integer receiverId, Integer routeId);

    Message updateStatus(MessageGetListDTO messageDTO);
}
