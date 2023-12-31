package com.azoudmustafa.repository.message;

import com.azoudmustafa.model.Message;
import com.azoudmustafa.model.Route;
import com.azoudmustafa.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    @Query("SELECT m FROM Message m WHERE m.route.id = :routeId AND ((m.sender.id = :userId1 AND m.receiver.id = :userId2) OR (m.sender.id = :userId2 AND m.receiver.id = :userId1)) order by m.id")
    List<Message> findConversationForRouteAndUsers(@Param("routeId") Integer routeId, @Param("userId1") Integer userId1, @Param("userId2") Integer userId2);

    @Query("SELECT m FROM Message m WHERE m.receiver.id=:receiverId and m.isRead =false")
    List<Message> findAllUnreadMessagesByUserId(@Param("receiverId") Integer receiverId);
    @Query("SELECT m FROM Message m WHERE m.sender.id = :senderId and m.receiver.id=:receiverId and m.route.id=:routeId and m.isRead =false")
    List<Message> findAllMessageFromSenderId(@Param("senderId") Integer senderId,
                                             @Param("receiverId") Integer receiverId,
                                             @Param("routeId") Integer routeId);
}
