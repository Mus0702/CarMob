package com.azoudmustafa.service.booking;

import com.azoudmustafa.dto.booking.BookingDTO;
import com.azoudmustafa.model.Booking;

public interface BookingService {

    BookingDTO save(BookingDTO bookingDTO);
}
