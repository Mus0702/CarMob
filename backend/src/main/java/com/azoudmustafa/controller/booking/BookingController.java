package com.azoudmustafa.controller.booking;

import com.azoudmustafa.dto.booking.BookingDTO;
import com.azoudmustafa.service.booking.BookingService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/booking")
public class BookingController {
    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingDTO> createBooking(@RequestBody BookingDTO bookingDTO) {
        if (bookingDTO != null) {
            BookingDTO savedBooking = bookingService.save(bookingDTO);
            return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);

        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
