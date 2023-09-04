package com.azoudmustafa.mapper.message;

import com.azoudmustafa.dto.message.MessageDTO;
import com.azoudmustafa.model.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface MessageMapper {

    MessageMapper INSTANCE = Mappers.getMapper(MessageMapper.class);

    @Mapping(source = "route.id", target = "routeId")
    @Mapping(source = "sender.id", target = "senderId")
    @Mapping(source = "receiver.id", target = "receiverId")
    MessageDTO messageToMessageDTO(Message entity);

    @Mapping(source = "routeId", target = "route.id")
    @Mapping(source = "senderId", target = "sender.id")
    @Mapping(source = "receiverId", target = "receiver.id")
    Message messageDtoToMessage(MessageDTO messageDTO);
}
