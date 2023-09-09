package com.azoudmustafa.model;

import com.azoudmustafa.enums.PaymentStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "route_id")
    private Route route;
    @ManyToOne
    @JoinColumn(name = "passenger_id")
    private User passenger;
    @Column(name = "reserved_seats")
    @Min(1)
    private Integer reservedSeats;
    @ManyToOne
    @JoinColumn(name = "driver_id")
    private User driver;
    @Column(name = "booking_date")
    private LocalDate bookingDate;
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;
    @Column(name = "is_notified")
    private Boolean isNotified;

    @PrePersist
    public void prePersist() {
        this.bookingDate = LocalDate.now();
    }


}
