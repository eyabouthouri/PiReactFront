
import React, { useState } from 'react';
import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet';
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css"
import "leaflet-control-geocoder/dist/Control.Geocoder.js"
import LeafletGeocoder from './LeafletGeocoder';
import LeafletRoutingMachine from './LeafletRoutingMachine';
import "./map.css"
function Map() {

  const position = [36.8065, 10.1815]

  return (

<div className='app'>
<MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
 <LeafletGeocoder/>
 {/*<LeafletRoutingMachine/> */}
  </MapContainer>
</div>
  );
}
let defaultIcon=L.icon({
  iconUrl:"/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
   
});
L.Marker.prototype.options.icon=defaultIcon;

export default Map;
