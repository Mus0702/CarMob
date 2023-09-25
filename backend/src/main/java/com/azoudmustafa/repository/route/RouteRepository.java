package com.azoudmustafa.repository.route;

import com.azoudmustafa.model.Route;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface RouteRepository extends JpaRepository<Route, Integer> {
    @Query("SELECT r FROM Route r " +
            "LEFT JOIN FETCH r.passengers " +
            "WHERE FUNCTION('ST_DWithin', r.departureLocation, " +
            "FUNCTION('ST_SetSRID', FUNCTION('ST_MakePoint', :selectDepartureAddressLong, :selectedDepartureAddressLat), 4326), " +
            "5000) = TRUE " +
            "AND FUNCTION('ST_DWithin', r.arrivalLocation, " +
            "FUNCTION('ST_SetSRID', FUNCTION('ST_MakePoint', :selectedArrivalAddressLong, :selectedArrivalAddressLat), 4326), " +
            "3000) = TRUE " +
            "AND r.departureDate = :departureDate " +
            "AND r.availableSeat >= :availableSeat")
    Page<Route> findAllBy(
            @Param("selectedDepartureAddressLat") Double selectedDepartureAddressLat,
            @Param("selectDepartureAddressLong") Double selectDepartureAddressLong,
            @Param("selectedArrivalAddressLat") Double selectedArrivalAddressLat,
            @Param("selectedArrivalAddressLong") Double selectedArrivalAddressLong,
            @Param("departureDate") LocalDate departureDate,
            @Param("availableSeat") Integer availableSeat,
            Pageable pageable
    );

    Optional<Route> findById(Integer id);

    @Query("SELECT r FROM Route r LEFT JOIN r.passengers p WHERE (r.driver.id = :userId OR p.id = :userId) and r.status = 'ACTIVE'")
    List<Route> findAllByUserId(@Param("userId") Integer userId);
}
