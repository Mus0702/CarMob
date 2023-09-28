package com.azoudmustafa.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.*;

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
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "receiver_id", nullable = false)
    private User receiver;
    @Column(nullable = false)
    private String content;
    @Transient
    LocalDateTime localNow = LocalDateTime.now();
    @Column(name = "time_stamp")
    private ZonedDateTime timestamp=  localNow.atZone(ZoneId.of("UTC"));


    @Column(name = "is_read")
    private Boolean isRead;

    @PrePersist
    public void prePersist() {
       this.isRead = false;
    }
}
