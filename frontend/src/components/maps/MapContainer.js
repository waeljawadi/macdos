import React from "react"
import Map from "./Map"
import { connect } from "react-redux"
import axios from "axios"
class MapContainer extends React.Component {
  componentDidMount = () => {
    const { updateListReducer } = this.props
    axios.get("/getall").then(res => updateListReducer(res.data))
  }
  render() {
    const { list, searchkey } = this.props
    let filtredlist
    searchkey != ""
      ? (filtredlist = list.filter(
          el => el.etat.indexOf(searchkey.toUpperCase()) > -1
        ))
      : (filtredlist = list.filter(el => el.etat == searchkey.toUpperCase()))
    return (
      <Map
        macdos={filtredlist}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAjbWil1vIoT2Kt0wA6x0JMJ80QDqG6VY8&callback=myMap`}
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
