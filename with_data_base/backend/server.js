const express = require("express")
const bodyParser = require("body-parser")
const csv = require("csvtojson")
const fs = require("fs")
const { MongoClient } = require("mongodb")

const csvFilePath = "./assets/mcdonalds.csv"
const jsonFilePath = "./assets/mcdonalds"

const MongoUrl = "mongodb://localhost:27017"
const database = "macdonald"

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

// --> Resultat obtenu va etre stocker dans un fichier "mcdonalds"
// ---> le fichier contient les donner formatter en json , mai il n'a pas d'extension ".json" -----explication---->
// quand je lance le serveur avec le plugin nodemon, l'extension .json cause
// un probleme ( serveur entre dans un boucle infini quand il fait le save des donner dans le fichier alors j'ai enlever le .json ) pour
// resoudre le probleme
// la plugin itullise un promise pour convertir le csv vers json

converter
  .fromFile(csvFilePath)
  .then(jsonObj =>
    fs.writeFile(jsonFilePath, JSON.stringify(jsonObj), err =>
      err
        ? console.log("Probleme while saving file")
        : console.log("The file was saved!")
    )
  )

MongoClient.connect(MongoUrl, { useNewUrlParser: true }, (err, client) => {
  err ? console.log("can not connect to database") : (db = client.db(database))

  //get list
  app.get("/checkdbstat", (req, res) => {
    db.collection("coordoner")
      .find()
      .toArray((err, data) => {
        if (err) res.send("can not get list")
        else res.send(data)
      })
  })

  //  x =  db.collection("coordoner").countDocuments({}, (err, nb) => {
  //     err ? console.log('Probleme survenu when counting') : nb
  // })

  app.post("/postmacdo", (req, res) => {
    fs.readFile(jsonFilePath, "utf8", (err, data) => {
      err ? err : console.log(data)
      var json = JSON.parse(data)
      let newlist = json
      db.collection("coordoner").insertMany(newlist, (err, data) => {
        if (err) res.send("cant not add list")
        else res.send("data added")
      })
    })
  })

  app.get("/getlist/:etat", (req, res) => {
    let search = req.params.etat.toUpperCase().trim()

    db.collection("coordoner")
      // .find({ 'etat': search }) -----> code etat exact
      .find({ etat: { $regex: search } }) // ----> il suffit qu'un caracere existe
      .toArray((err, data) => {
        if (err) res.send("can not get list")
        else res.send(data)
      })
  })
})

const port = process.env.PORT || 3008
app.listen(port, err =>
  err ? console.log("Server is down") : console.log("Server up and runing")
)
