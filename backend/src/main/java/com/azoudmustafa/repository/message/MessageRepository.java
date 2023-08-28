package com.azoudmustafa.repository.message;

import com.azoudmustafa.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message,Integer> {


}
