import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps'

export default function Map({lat, lng}){
    return(
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{lat: lat, lng: lng}}
        >
            <Marker position={{lat: lat, lng: lng}} />
        </GoogleMap>
    )
}

export const WrappedMap = withScriptjs(withGoogleMap(Map))