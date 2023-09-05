package com.azoudmustafa.dto.booking;

import com.azoudmustafa.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingDTO {
    private Integer id;
    private Integer routeId;
    private Integer passengerId;
    private Integer driverId;
    private Integer reservedSeats;
    private LocalDate bookingDate;
    private PaymentStatus status;
}
