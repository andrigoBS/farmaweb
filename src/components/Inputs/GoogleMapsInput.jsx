import React, {useState} from "react";
import AbstractGoogleMaps from "../basic/BasicGoogleMaps";

const GoogleMapsInput = (props) =>{
    let init = props.initCenter == null? {lat: -27.5163541, lng: -48.841851} : props.initCenter;
    let style = props.style == null? { width: '94%', height: '90%'} : props.style;

    let [latLng, setLatLng] = useState(init);
    const onMapClicked = (mapProps, map, clickEvent) => {
        let latLngGoogle = clickEvent.latLng;
        setLatLng({
            lat: latLngGoogle.lat(),
            lng: latLngGoogle.lng(),
        });
        props.onChange(latLng);
    };

    return <AbstractGoogleMaps
        latLng={latLng}
        onClick={onMapClicked}
        style={style}/>
};

export default GoogleMapsInput;