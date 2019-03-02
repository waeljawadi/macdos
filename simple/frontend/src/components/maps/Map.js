import React from "react"
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import { connect } from "react-redux"
import MapMarker from "./MapMarker"
const Map = withScriptjs(
  withGoogleMap(props => {

// mapping du liste final 
// ---> la component Mapmarker va faire le hundle de chaque restaurent 
// et l'afficher sur le map avec une info bulle
// passage des info sous forme de deux props
// --- location ---> contient les coordonner google map
// infosuppl ----> contient les information de l'infobulle de chaque restaurant
    const markers = props.macdos.map((macdo,index) => (
      <MapMarker
      key={index}
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

    // la carte google map va etre centrer selon 
    // la recherche effectuer  par le user 
    // traitement fait dans le reducer ---> centermap


    // extraction des info longitude, latitude, zoom
    const { lat, lng, zoom } = props.coordonner
    return (
      <React.Fragment>
        <GoogleMap zoom={zoom} center={{ lat: lat, lng: lng }}>

        {/* affichage des marqeur deja traité dans la component MAPMARKER  */}
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
