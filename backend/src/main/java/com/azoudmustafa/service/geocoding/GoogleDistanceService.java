package com.azoudmustafa.service.geocoding;

import com.google.maps.DistanceMatrixApi;
import com.google.maps.GeoApiContext;
import com.google.maps.model.DistanceMatrix;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Service;

@Service
public class GoogleDistanceService {

    Dotenv dotenv = Dotenv.load();
    private final String API_KEY = Dotenv.load().get("GOOGLE_MAP_API_KEY");

    public long getDistanceBetweenAddresses(String origin, String destination) throws Exception {
        GeoApiContext context = new GeoApiContext.Builder()
                .apiKey(API_KEY)
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

