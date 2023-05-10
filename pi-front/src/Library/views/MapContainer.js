import React, { useEffect, useState } from "react";
import axios from "axios";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%",
};

const MapContainer = (props) => {
    const [libraries, setLibraries] = useState([]);
  
    useEffect(() => {
      const fetchLibraries = async () => {
        const response = await axios.get("/library/listL");
        if (response.status === 200) {
          const librariesWithLocation = await Promise.all(
            response.data.map(async (library) => {
              try {
                const geocodeResponse = await axios.get(
                  `https://maps.googleapis.com/maps/api/geocode/json?address=${library.pays}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
                );
                const { lat, lng } = geocodeResponse.data.results[0].geometry.location;
                console.log("Library:", library.name, "Location:", { lat, lng });
                return {
                  ...library,
                  location: {
                    lat,
                    lng,
                  },
                };
              } catch (error) {
                console.error(`Error geocoding ${library.pays}: ${error.message}`);
                return library;
              }
            })
          );
          setLibraries(librariesWithLocation);
        }
      };
      fetchLibraries();
    }, []);
  
    return (
      <Map
        google={props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
            lat:0,
            lng: 0,
        }}
      >
        {libraries.map((library) => (
          library.location && <Marker
            key={library._id}
            position={library.locn}
            title={library.name}
          />
        ))}
      </Map>
    );
  };
export default GoogleApiWrapper({
  apiKey: "AIzaSyDjf8SVxhjBICh4Uyyu9zpXLurjngw--V0",
})(MapContainer); 