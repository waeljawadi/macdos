const center = { lat: 38, lng: -99, zoom: 4.4 }
const centermap = (state = center, action) => {
  switch (action.type) {
    case "UPDATECENTER":
      if (action.searchkey.toUpperCase() == "A") {
        return { lat: 51, lng: -114, zoom: 3.3 }
      } else if (action.searchkey.toUpperCase() == "AK") {
        return { lat: 63, lng: -147, zoom: 5 }
      } else if (action.searchkey.toUpperCase() == "H") {
        return { lat: 34, lng: -115, zoom: 4 }
      } else if (action.searchkey.toUpperCase() == "HI") {
        return { lat: 20.8, lng: -158, zoom: 7.3 }
      } else return { lat: 38, lng: -99, zoom: 4.4 }
    default:
      return state
  }
}
export default centermap
