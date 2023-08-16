package com.azoudmustafa.service.geocoding;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.LatLng;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class GoogleGeocodingService {
    Dotenv dotenv = Dotenv.load();


    private final String API_KEY = Dotenv.load().get("GOOGLE_MAP_API_KEY");

    @Cacheable(value = "geocodingResults", key = "#address")
    public LatLng getLatLngFromAddress(String address) {
        GeoApiContext context = new GeoApiContext.Builder()
                .apiKey(API_KEY)
                .build();

        try {
            GeocodingResult[] results = GeocodingApi.geocode(context, address).await();
            if (results != null && results.length > 0) {
                return results[0].geometry.location;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
