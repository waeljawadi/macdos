const express = require("express")
const assert = require("assert")
const bodyParser = require("body-parser")
const csv = require("csvtojson")
const fs = require("fs")
const csvFilePath = "./assets/mcdonalds.csv"
const app = express()
app.use(bodyParser.json())
let change_columns = column =>
  column
    .split("")
    .filter(el => el != '"')
    .join("") 
const converter = csv({
  noheader: true,
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
  ignoreColumns: /(etatagain)/,
  quote: "'",
  escape: '"',
  colParser: {
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
converter.fromFile(csvFilePath).then(jsonObj => {
  app.get("/getall", (req, res) => {
    res.send(jsonObj)
  })
})
app.listen(3007)
