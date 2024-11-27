import { useEffect, useContext, useRef, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../utils/AuthContext";
import googleMapsLoader from "./GoogleMapsLoader";

const Map = ({ setMapObject }) => {
  const googlemap = useRef(null);
  const [map, setMap] = useState(null);
  const { allDriverLocation } = useContext(AuthContext);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (map) return;

    googleMapsLoader
      .load()
      .then(() => {
        const google = window.google;
        const initialView = {
          center: { lat: 34.9988127, lng: 135.7674863 },
          zoom: 14,
        };

        const buttonsDisabled = {
          fullscreenControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          zoomControl: true,
        };

        const newMap = new google.maps.Map(googlemap.current, {
          ...initialView,
          ...buttonsDisabled,
        });

        setMap(newMap);
        setMapObject(newMap);
      })
      .catch((error) => {
        console.error("Error loading Google Maps:", error);
      });
  }, [map, setMapObject]);

  useEffect(() => {
    if (!map || !allDriverLocation) return;

    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  
    const driverLocations = 
          allDriverLocation?.all_driver_location?.length > 0
            ? allDriverLocation.all_driver_location
            : [
                { lat: 34.9988127, lng: 135.7674863, title: "Location 1" },
                { lat: 35.0116, lng: 135.7681, title: "Location 2" },
                { lat: 35.002, lng: 135.77, title: "Location 3" },
              ];
  
    // Add new markers
    const google = window.google;
    const bounds = new google.maps.LatLngBounds(); // Create bounds object
    const newMarkers = driverLocations.map((location) => {
      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: location.title || "Driver Location",
      });

      bounds.extend(marker.getPosition()); // Extend bounds to include marker
      return marker;
    });
  
    setMarkers(newMarkers); // Update state with the new markers
  
    // Adjust the map to fit all markers
    map.fitBounds(bounds); // Automatically adjust zoom and center
  }, [map, allDriverLocation]); // React whenever map or driver data changes
  

  return <div ref={googlemap} style={{ width: "100%", height: "500px" }} />;
};

Map.propTypes = {
  setMapObject: PropTypes.func.isRequired,
};

export default Map;
