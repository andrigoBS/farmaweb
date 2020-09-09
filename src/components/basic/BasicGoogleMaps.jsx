import React from "react";
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';

const MapContainer= (props) =>{
    return <Map google={props.google}
                zoom={10}
                initialCenter={props.latLng}
                style={props.style}
                onClick={props.onClick}>
        <Marker position={props.latLng} />
    </Map>
};

export default GoogleApiWrapper({
    apiKey: "AIzaSyCgPz-h1gXCuXDckk9jEyd1qx_gLO2MEBE",
    //apiKey: "AIzaSyDNhUyKhccm9eniT2zZGYgo4pc60eTlNBw",
    language: "português",
})(MapContainer);