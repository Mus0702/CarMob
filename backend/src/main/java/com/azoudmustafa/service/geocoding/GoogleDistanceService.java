package com.azoudmustafa.service.geocoding;

import org.springframework.stereotype.Service;


import com.google.maps.DistanceMatrixApi;
import com.google.maps.GeoApiContext;
import com.google.maps.model.DistanceMatrix;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class GoogleDistanceService {

//    @Value("${google.api.key}")
    private String apiKey;

    public long getDistanceBetweenAddresses(String origin, String destination) throws Exception {
        GeoApiContext context = new GeoApiContext.Builder()
                .apiKey(apiKey)
                .build();

        DistanceMatrix distanceMatrix = DistanceMatrixApi.newRequest(context)
                .origins(origin)
                .destinations(destination)
                .await();

        if (distanceMatrix.rows.length > 0 && distanceMatrix.rows[0].elements.length > 0) {
            return distanceMatrix.rows[0].elements[0].distance.inMeters;
        } else {
            throw new Exception("No distance found");
        }
    }
}

