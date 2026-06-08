"use client";

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { NEXT_PUBLIC_GOOGLE_MAPS_API_KEY } from "@/config/variables";

// Map container style
const containerStyle = {
    width: "100%",
    height: "100vh",
};

// Center of the map (India)
const center = {
    lat: 22.9734,
    lng: 78.6569,
};

export const MapWithMarkers = ({ locations }) => {
    const validLocations = Array.isArray(locations)
        ? locations.filter(
              (location) =>
                  location &&
                  location.template_fields &&
                  location.template_fields.latitude &&
                  location.template_fields.longitude
          )
        : [];

    if (validLocations.length === 0) {
        return null;
    }

    return (
        <LoadScript googleMapsApiKey={NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={5}
            >
                {validLocations.map((location, index) => (
                    <Marker
                        key={index}
                        position={{
                            lat: parseFloat(location?.template_fields.latitude),
                            lng: parseFloat(
                                location?.template_fields.longitude
                            ),
                        }}
                        title={location.title}
                    />
                ))}
            </GoogleMap>
        </LoadScript>
    );
};
