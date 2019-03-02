import React from "react"
import { Component } from "react"
import { connect } from "react-redux"
import axios from "axios"

class Search extends Component {
  constructor(props) {
    super(props)

    // cette state contient le value de l'input search

    this.state = { searchkey: "" }
  }

  //  fonction pour que le value de l'input search devient controlable
  //  par le component (on va stocker le value dans une state "searchkey")

  handlechange = event => {
    const { updateListReducer } = this.props
    this.setState({ [event.target.name]: event.target.value }, () =>
      axios
        .get(`/getlist/${this.state.searchkey}`)
        .then(res => updateListReducer(res.data),
        this.props.upadatecenter(this.state.searchkey)
        )
    )

  }


  componentDidMount() {



    axios
        .get('/checkdbstat').then(res => 
         
          (res.data.length !== 13912) 
          &&
          axios.post('/postmacdo')
          .then( console.log('Base de donner mis a jour '))
          .catch((err)=> console.log("erreur pendant l'insertion")) 
          )
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
              placeholder="code du state"
              name="searchkey"
              value={this.state.searchkey}
              onChange={this.handlechange}
            />
          </div>
        </div>
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
    },
    updateListReducer: list => {
      dispatch({
        type: "UPDATE_LIST",
        list
      })
    }
  }
}
export default connect(
  null,
  mapDispatchToProps
)(Search)
