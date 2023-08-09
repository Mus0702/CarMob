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
    @Query("SELECT r FROM Route r " +
            "WHERE r.departureAddress.id = :departureAddressId " +
            "AND r.arrivalAddress.id = :arrivalAddressID " +
            "AND r.departureDate = :departureDate " +
            "AND r.availableSeat >= :availableSeat")
    Page<Route> findAllBy(
            @Param("departureAddressId") Integer departureAddressId,
            @Param("arrivalAddressID") Integer arrivalAddressID,
            @Param("departureDate") LocalDate departureDate,
            @Param("availableSeat") Integer availableSeat,
            Pageable pageable
    );
}
