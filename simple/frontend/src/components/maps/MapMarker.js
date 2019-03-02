import React from "react"
import { Component } from "react"
import { Marker, InfoWindow } from "react-google-maps"




// import du png markeur
import marker from "../../assets/pictures/restaurant.png"



// impor du css
import "./style/style.css"




class MapMarker extends Component {


  // par default l'info bulle est cacher
  // elle s'affiche ai hover sur le Marker
  //  showInfoWindow ---> init a False
  state = {
    showInfoWindow: false
  }

  // hover ----> showInfoWindow :  change vers true  
  handleMouseOver = e => {
    this.setState({
      showInfoWindow: true
    })
  }


    // onMouseOut ----> showInfoWindow :  change vers false 

  handleMouseExit = e => {
    this.setState({
      showInfoWindow: false
    })
  }
  render() {

    // extraction de showInfoWindow depuis state 
    const { showInfoWindow } = this.state

    // extration deux etape :
    // 1 extraction de deux objet (location,infosuppl) depuit le props
    // 2 extraction des information de l'objet (infosuppl)
    const {location,infosuppl} = this.props

    const {macname,adresse,etat,ville,phone} = infosuppl

    return (
      <React.Fragment>
        <Marker

// envoie des info sous forme de props vers le component Marker --> 
// les donner vont etre traite par google map
// --> Marker : component propre au plugin installer

          position={location}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseExit}


          //  icon: lien vers l'icon du marker 
          //  marker:variable contient un png
          icon={marker}
        >
          {showInfoWindow && (
            <InfoWindow className="infowindow">


            {/* affiche de l'info bulle  */}
              <p>
                <i className="fas fa-utensils" /> {macname}
                <br />
                <i className="fas fa-map-marker-alt" />{" "}
                {adresse}, {etat},
                {ville}
                <br />
                <i className="fas fa-phone-volume" /> {phone}
              </p>
            </InfoWindow>
          )}
        </Marker>
      </React.Fragment>
    )
  }
}
export default MapMarker
