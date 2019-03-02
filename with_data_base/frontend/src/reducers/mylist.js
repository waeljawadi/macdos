// La list des macdo restau est init a []
const mylist = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_LIST":
      return action.list
    default:
      return state
  }
}
export default mylist
