import React from "react"
import { Component } from "react"
import MapContainer from "./maps/MapContainer"
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
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1"><br/>
              Search MacDonalds by State name :
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="State name goes here"
              name="searchkey"
              value={this.state.searchkey.toUpperCase()}
              onChange={this.handlechange}
            />
          </div>
          <MapContainer searchkey={this.state.searchkey} />
        </div>
      </React.Fragment>
    )
  }
}
export default Search
