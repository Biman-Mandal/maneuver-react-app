// utils/googleMapsLoader.js
import { Loader } from "@googlemaps/js-api-loader";

// Singleton instance of Loader
const googleMapApiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY
const googleMapsLoader = new Loader({
  apiKey : googleMapApiKey,
  version: "weekly",
});

export default googleMapsLoader;
