package com.azoudmustafa.repository;

import com.azoudmustafa.model.Route;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface RouteRepository extends JpaRepository<Route, Integer> {
    @Query(value = "SELECT * FROM route r " +
            "WHERE ST_DWithin(r.departure_location, " +
            "ST_SetSRID(ST_MakePoint(:selectDepartureAddressLong, :selectedDepartureAddressLat), 4326), " +
            "5000) " +
            "AND ST_DWithin(r.arrival_location, " +
            "ST_SetSRID(ST_MakePoint(:selectedArrivalAddressLong, :selectedArrivalAddressLat), 4326), " +
            "3000) " +
            "AND r.departure_date = :departureDate " +
            "AND r.available_seat >= :availableSeat", nativeQuery = true)
    Page<Route> findAllBy(
            @Param("selectedDepartureAddressLat") Double selectedDepartureAddressLat,
            @Param("selectDepartureAddressLong") Double selectDepartureAddressLong,
            @Param("selectedArrivalAddressLat") Double selectedArrivalAddressLat,
            @Param("selectedArrivalAddressLong") Double selectedArrivalAddressLong,
            @Param("departureDate") LocalDate departureDate,
            @Param("availableSeat") Integer availableSeat,
            Pageable pageable
    );
}
