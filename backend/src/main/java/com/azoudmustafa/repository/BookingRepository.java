package com.azoudmustafa.repository;

import com.azoudmustafa.model.Booking;
import com.azoudmustafa.model.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Integer> {

    @Query("SELECT b FROM Booking b WHERE b.isNotified = false and b.route.departureDate<:currentDate")
    List<Booking> findBookingsToNotify(@Param("currentDate") LocalDate currentDate);
}
