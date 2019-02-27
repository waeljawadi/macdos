import React from "react"
import { Component } from "react"
import { Marker, InfoWindow } from "react-google-maps"
class MapMarker extends Component {
  state = {
    showInfoWindow: false
  }
  handleMouseOver = e => {
    this.setState({
      showInfoWindow: true
    })
  }
  handleMouseExit = e => {
    this.setState({
      showInfoWindow: false
    })
  }
  render() {
    const { showInfoWindow } = this.state
    return (
      <React.Fragment>
        <Marker
          position={this.props.location}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseExit}
          icon="https://www.kingsway-tyres.co.uk/wp-content/uploads/2017/04/map-marker-pin-icon.svg"
        >
          {showInfoWindow && (
            <InfoWindow>
              <p>
                <i class="fas fa-utensils" /> {this.props.infosuppl.macname}
                <br />
                <i class="fas fa-map-marker-alt" />{" "}
                {this.props.infosuppl.adresse}, {this.props.infosuppl.etat},{" "}
                {this.props.infosuppl.ville}
                <br />
                <i class="fas fa-phone-volume" /> {this.props.infosuppl.phone}
              </p>
            </InfoWindow>
          )}
        </Marker>
      </React.Fragment>
    )
  }
}
export default MapMarker
