import React from "react"
import Map from "./Map"
import { connect } from "react-redux"
import axios from "axios"
class MapContainer extends React.Component {
  componentDidMount = () => {
    axios.get("/getall").then(res => this.props.updateListReducer(res.data))
  }
  render() {
    const filtredlist = this.props.list.filter(el =>
      el.etat.indexOf(this.props.searchkey.toUpperCase()) > -1
    )
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
