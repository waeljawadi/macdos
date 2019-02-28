
// La list des macdo restau est init a []
// Apres que la component ---> didmount : la value du state va recevoir la list complete 
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