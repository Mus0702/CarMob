package com.azoudmustafa.repository;

import com.azoudmustafa.model.Address;
import com.azoudmustafa.model.Route;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<Route, Integer> {
    @Query(value = "SELECT * FROM route r " +
            "WHERE r.arrival_address = :userArrivalAddress " +
            "AND ST_DWithin(r.departureCoordinates::geography, " +
            "ST_SetSRID(ST_MakePoint(:userDepartureAddressLong, :userDepartureAddressLat), 4326)::geography, " +
            "1000) " +
            "AND r.departure_date = :departureDate " +
            "AND r.available_seat >= :availableSeat", nativeQuery = true)
    Page<Route> findAllBy(
            @Param("userDepartureAddress") String userDepartureAddress,
            @Param("userArrivalAddress") String userArrivalAddress,
            @Param("departureDate") LocalDate departureDate,
            @Param("availableSeat") Integer availableSeat,
            Pageable pageable
    );
}
