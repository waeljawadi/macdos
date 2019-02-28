import React from "react"
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import { connect } from "react-redux"
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
    const { lat, lng, zoom } = props.coordonner
    return (
      <React.Fragment>
        <GoogleMap zoom={zoom} center={{ lat: lat, lng: lng }}>
          {markers}
        </GoogleMap>
      </React.Fragment>
    )
  })
)
const mapStateToProps = state => {
  return { coordonner: state.centermap }
}
export default connect(mapStateToProps)(Map)
