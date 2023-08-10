package com.azoudmustafa.geocoding;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.locationtech.jts.geom.Point;

import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class GeoCodingResponse {
    @JsonProperty("results")
    private List<GeoCodingResponse> results;

    @Embeddable
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class GeoCodingResult {
        private Geometry geometry;

        @Embeddable
        @Getter
        @Setter
        @AllArgsConstructor
        @NoArgsConstructor
        public static class Geometry {
            private Point location;
        }
    }

}
