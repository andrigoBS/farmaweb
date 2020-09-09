import React from "react";
import AbstractGoogleMaps from "../basic/BasicGoogleMaps";

const GoogleMapsViewPoint = (props) =>{
    return <AbstractGoogleMaps
                latLng={props.latLng}
                style={props.style}/>
};

export default GoogleMapsViewPoint;