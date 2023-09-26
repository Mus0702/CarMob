package com.azoudmustafa.service.booking;

import com.azoudmustafa.dto.booking.BookingDTO;
import com.azoudmustafa.exceptionHandler.BadRequestException;
import com.azoudmustafa.mapper.BookingMapper;
import com.azoudmustafa.model.Booking;
import com.azoudmustafa.model.Route;
import com.azoudmustafa.model.User;
import com.azoudmustafa.repository.BookingRepository;
import com.azoudmustafa.repository.route.RouteRepository;
import com.azoudmustafa.repository.user.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final RouteRepository routeRepository;
    private final UserRepository userRepository;

    public BookingServiceImpl(
            BookingRepository repository,
            RouteRepository routeRepository,
            UserRepository userRepository
    ) {
        this.bookingRepository = repository;
        this.routeRepository = routeRepository;
        this.userRepository = userRepository;
    }

    @Override
    public BookingDTO save(BookingDTO bookingDTO) {
        Route route = routeRepository.findById(bookingDTO.getRouteId())
                .orElseThrow(null);
        User passenger = userRepository.findById(bookingDTO.getPassengerId())
                .orElseThrow(null);

        if (bookingDTO.getReservedSeats() > route.getAvailableSeat()) {
            throw new BadRequestException("There is no more available seats for this trip.");
        }
        route.setAvailableSeat(route.getAvailableSeat() - bookingDTO.getReservedSeats());
        route.getPassengers().add(passenger);
        routeRepository.save(route);

        User driver = userRepository.findById(bookingDTO.getDriverId())
                .orElseThrow(null);

        Booking booking = Booking.builder()
                .route(route)
                .passenger(passenger)
                .driver(driver)
                .reservedSeats(bookingDTO.getReservedSeats())
                .status(bookingDTO.getStatus())
                .isNotified(false)
                .build();

        Booking savedBbooking = bookingRepository.save(booking);
        return BookingMapper.INSTANCE.toDTO(savedBbooking);
    }
}
