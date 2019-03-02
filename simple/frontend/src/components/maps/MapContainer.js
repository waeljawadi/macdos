import React from "react"
import Map from "./Map"
import { connect } from "react-redux"
import axios from "axios"
class MapContainer extends React.Component {
  componentDidMount = () => {
    // extraction du fonction  updateListReducer
    const { updateListReducer } = this.props
    // apres la mntage  du component MapContrainer on lance une requete avec AXIOS get pour recevoir les donner du backend
    // apres extraction du donner , on les passe comme paramtre dans la fonction ---> updateListReducer
    // les donner envoyer comme parametre vont etre stocker dans le reducer , on va les utiliser comme list par default
    axios.get("/getall").then(res => updateListReducer(res.data))
  }
  render() {
    // extraction des list, searchkey
    const { list, searchkey } = this.props
    let filtredlist


// filtrage du list pour obtenir une resultat selon le valuer saisie dans l'input du search 
// Sensible a la case : non 
    searchkey !== ""
      ? (filtredlist = list.filter(
          el => el.etat.indexOf(searchkey.toUpperCase()) > -1
        ))
      : (filtredlist = list.filter(el => el.etat === searchkey.toUpperCase()))



    return (
      // list filtrer des macdonal , evoyer comme props vers la component map
      <Map
        macdos={filtredlist}
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
const mapDispatchToProps = dispatch => {
  return {
    updateListReducer: list => {
      dispatch({
        type: "UPDATE_LIST",
        list
      })
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer)
