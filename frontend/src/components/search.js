import React from "react"
import { Component } from "react"
import MapContainer from "./maps/MapContainer"
import { connect } from "react-redux"
class Search extends Component {
  constructor(props) {
    super(props)

  // cette state contient le value de l'input search

    this.state = { searchkey: "" }
  }

  //  fonction pour que le value de l'input search devient controlable
  //  par le component (on va stocker le value dans une state "searchkey")

  handlechange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // A chaque fois il ya un update au niveau du component la fonction
  // on va passer le contenue du "search" comme parametre au fonction : upadatecenter
  // un traitement va etre fais au niveau du reducer "centermap"
  // documentation complete au niveau du reducer :  ---> centermap

  componentDidUpdate() {
    this.props.upadatecenter(this.state.searchkey)
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">
              <br />
              Search MacDonalds by State "code du state" :
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="State name goes here"
              name="searchkey"
              value={this.state.searchkey}
              onChange={this.handlechange}
            />
          </div>
        </div>
        <MapContainer searchkey={this.state.searchkey.trim()} />
      </React.Fragment>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    upadatecenter: searchkey => {
      dispatch({
        type: "UPDATECENTER",
        searchkey
      })
    }
  }
}
export default connect(
  null,
  mapDispatchToProps
)(Search)
