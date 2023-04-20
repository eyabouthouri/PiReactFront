import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";


const LeafletRoutingMachine = () => {
    const map = useMap();
   
    useEffect(() => {
   L.Routing.control({
    waypoints:[L.latLng(57.74,11.94),L.latLng(57.6792,11.949)],
    lineOptions: {
        styles: [
          {
            color: "blue",
            weight: 4,
            opacity: 0.7,
          },
        ],
      },
      routeWhileDragging: false,
      geocoder: L.Control.Geocoder.nominatim(),



   }).addTo(map);
    
    }, []);
    return null;
  };
  
  export default LeafletRoutingMachine;