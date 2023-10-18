package com.azoudmustafa.controller.geocoding;

import com.azoudmustafa.service.geocoding.GoogleGeocodingService;
import com.google.maps.model.LatLng;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class GeocodingController {

    private final GoogleGeocodingService googleGeocodingService;

    @GetMapping("/getLatLng")
    public ResponseEntity<LatLng> getAddressLatLng(@RequestParam String address) {
        LatLng result = googleGeocodingService.getLatLngFromAddress(address);
        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }


}
