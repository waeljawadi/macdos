const express = require("express")
const bodyParser = require("body-parser")
const csv = require("csvtojson")
const csvFilePath = "./assets/mcdonalds.csv"
const app = express()
app.use(bodyParser.json())

//  fonction  : change_columns
// utulité : filtrer le colonne du API json
// format au debut ("\"\""texttext" ou "texttext"\"\") -----Apres filtrage-------> "texttext"
// etape du traitement :
//  1 - conversion du STRING vers ARRAY
//  2 - filtrage
//  3 - conversion du ARRAY vers STRING -- type init
let change_columns = column =>
  column
    .split("")
    .filter(el => el != '"')
    .join("")

const converter = csv({
  noheader: true,

  // le plugin "csvtojson" associe des nom par default au colonnne
  // ---> format par default (filed1, filed2, field3 ......)
  // ----> a traver headers on change le nom par default un d'autre de notre choix

  headers: [
    "longitude",
    "latitude",
    "macname",
    "etat",
    "adresse",
    "ville",
    "etatagain",
    "phone"
  ],

  // il ya une reptition de nom de etat
  // ----> j'ai creer un colonnne "etat"  lest la duplication du colonne etat "again"
  // ---> on va ignorer la colonne redendante "etat again" a travers l'outil "ignoreColumns"

  ignoreColumns: /(etatagain)/,
  quote: "'",
  escape: '"',
  colParser: {
    // Application du filtre
    // le deux colonne (latitude,longitude) ---> converti vers number apres filtrage
    latitude: column => Number(change_columns(column)),
    longitude: column => Number(change_columns(column)),
    macname: column => change_columns(column),
    etat: column => change_columns(column),
    adresse: column => change_columns(column),
    ville: column => change_columns(column),
    etatagain: column => change_columns(column),
    phone: column => change_columns(column)
  }
})

// la plugin itullise un promise pour convertir le csv vers json
// --> apres le traitement on envoie la resultat jsonObj dans un request de type GET a travers EXPRESS
converter.fromFile(csvFilePath).then(jsonObj => {
  app.get("/getall", (req, res) => {
    res.send(jsonObj)
  })
})

const port = process.env.PORT || 3007

app.listen(port, err =>
  err ? console.log("Server is down") : console.log("Server up and runing")
)
