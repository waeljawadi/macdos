// la map est initialiser au valeur du constant "center"
const center = { lat: 38, lng: -99, zoom: 4.4 }

// les valeurs de l'attitude est longitude est le niveau du zoom vont changer apres un test sur la veleur du
// input "SEARCH"

// 1 - si la valeur egale a "A" ou K
// -----> le code de etat de ALASKA est AK ---> contient A et K
// ------> il ya d'autre etat que leur code contient par A comme California "CA" ou qui contient  K comme OKLAHOMA "OK"
// --> on va réduire le zoom pour que tous les markeur s'affiche

// 2 - si la valeur egale a "AK"
// on va faire un zoom sur ALASKA

//  3 - si la valeur egale a "H" ou "I"
//  -----> le code de etat de HAWAI est HI ---> contient H et I
// ------> il ya d'autre etat que leur code contient par H comme OHAYO "OH" ou qui contient  I comme Mississippi "I"
// --> on va réduire le zoom pour que tous les markeur s'affiche


// 4 - si la valeur egale a "HI"
// on va faire un zoom sur HAWAI

const centermap = (state = center, action) => {
  switch (action.type) {
    case "UPDATECENTER":
      if (
        action.searchkey.toUpperCase() === "A" ||
        action.searchkey.toUpperCase() === "K"
      ) {
        return { lat: 51, lng: -114, zoom: 3.3 }
      } else if (action.searchkey.toUpperCase() === "AK") {
        return { lat: 63, lng: -147, zoom: 5 }
      } else if (
        action.searchkey.toUpperCase() === "H" ||
        action.searchkey.toUpperCase() === "I"
      ) {
        return { lat: 36.5, lng: -115, zoom: 4 }
      } else if (action.searchkey.toUpperCase() === "HI") {
        return { lat: 20.8, lng: -158, zoom: 7.3 }
      } else return { lat: 38, lng: -99, zoom: 4.4 }
    default:
      return state
  }
}
export default centermap
