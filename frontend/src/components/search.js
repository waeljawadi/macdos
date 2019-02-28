import React from "react"
import { Component } from "react"
import MapContainer from "./maps/MapContainer"
import { connect } from "react-redux"
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = { searchkey: "" }
  }
  handlechange = (event, { list } = this.props) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
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
              Search MacDonalds by State "KEY" :
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
        <MapContainer searchkey={this.state.searchkey} />
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
