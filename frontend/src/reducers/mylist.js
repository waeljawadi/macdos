
const mylist=(state=[],action)=>
{
  switch(action.type)
  {    
      case 'UPDATE_LIST':
      return(
          state=action.list
      )
      default :
      return state
  }
}
export default mylist