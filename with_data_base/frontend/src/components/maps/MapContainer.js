import React from "react"
import Map from "./Map"
import { connect } from "react-redux"
class MapContainer extends React.Component {
  
  render() {
    const { list } = this.props
    return (
      // list filtrer des macdonal , evoyer comme props vers la component map
      <Map
        macdos={list}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDaBDV1fk_Gg9xjLoxyzn4VQwVmUxmixEs`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `500px`, width: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}
const mapStateToProps = state => {
  return {
    list: state.mylist
  }
}
export default connect(mapStateToProps)(MapContainer)
