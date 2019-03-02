import React, { Component } from "react"
import Search from "./components/search"
import MapContainer from './components/maps/MapContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search />
       <MapContainer /> 
      </div>
    )
  }
}
export default App
