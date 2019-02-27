import React from "react"
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import MapMarker from "./MapMarker"
const Map = withScriptjs(
  withGoogleMap(props => {
    const markers = props.macdos.map(macdo => (
      <MapMarker
        location={{ lat: macdo.latitude, lng: macdo.longitude }}
        infosuppl={{
          macname: macdo.macname,
          etat: macdo.etat,
          adresse: macdo.adresse,
          ville: macdo.ville,
          phone: macdo.phone
        }}
      />
    ))
    return (
      <GoogleMap defaultZoom={4.3} center={{ lat: props.macdos[0].latitude, lng: props.macdos[0].longitude }}>
        {markers}
      </GoogleMap>
    )
  })
)
export default Map