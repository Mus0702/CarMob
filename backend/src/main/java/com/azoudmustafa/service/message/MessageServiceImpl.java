package com.azoudmustafa.service.message;

import com.azoudmustafa.dto.message.MessageDTO;
import com.azoudmustafa.dto.message.MessageGetListDTO;
import com.azoudmustafa.mapper.message.MessageMapper;
import com.azoudmustafa.model.Message;
import com.azoudmustafa.model.Route;
import com.azoudmustafa.model.User;
import com.azoudmustafa.repository.message.MessageRepository;
import com.azoudmustafa.repository.route.RouteRepository;
import com.azoudmustafa.repository.user.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Getter
@Setter
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final RouteRepository routeRepository;
    private final MessageMapper messageMapper;


    public Message save(MessageDTO messageDTO) {
        Message messageEntity = MessageMapper.INSTANCE.messageDtoToMessage(messageDTO);
        return messageRepository.save(messageEntity);
    }

    public Message updateStatus(MessageGetListDTO messageDTO) {
        Message messageEntity = MessageMapper.INSTANCE.messageGetListDTOToEntity(messageDTO);
        messageEntity.setIsRead(true);
        return messageRepository.save(messageEntity);
    }

    @Override
    public List<MessageGetListDTO> findAllByRouteAndUser(Integer routeId, Integer user1Id, Integer user2Id) {
        List<Message> messages = messageRepository.findConversationForRouteAndUsers(routeId, user1Id, user2Id);
        List<MessageGetListDTO> messagesDTO = new ArrayList<>();
        for (Message message : messages) {

            messagesDTO.add(messageMapper.toMessageGetListDTO(message));
        }
        return messagesDTO;

    }

    @Override
    public List<MessageGetListDTO> findAllUnreadMessagesByUserId(Integer receiverId) {
        List<Message> unreadMessages = messageRepository.findAllUnreadMessagesByUserId(receiverId);
        List<MessageGetListDTO> unreadMessagesDTO = new ArrayList<>();

        for (Message unReadMessage : unreadMessages) {

            unreadMessagesDTO.add(messageMapper.toMessageGetListDTO(unReadMessage));
        }
        return unreadMessagesDTO;


    }

    @Override
    public List<MessageGetListDTO> findAllMessageFromSenderId(Integer senderId, Integer receiverId, Integer routeId) {
        List<Message> unreadMessages = messageRepository.findAllMessageFromSenderId(senderId, receiverId, routeId);
        List<MessageGetListDTO> unreadMessagesDTO = new ArrayList<>();

        for (Message unReadMessage : unreadMessages) {

            unreadMessagesDTO.add(messageMapper.toMessageGetListDTO(unReadMessage));
        }
        return unreadMessagesDTO;
    }

}
