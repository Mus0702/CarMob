package com.azoudmustafa.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "route_id", nullable = false)
    private Route route;
    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;
    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    private User receiver;
    @Column(nullable = false)
    private String content;
    @Column(nullable = false, updatable = false)
    private LocalTime timestamp;


}
