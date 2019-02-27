const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const csv = require("csvtojson")
const csvFilePath = "./assets/mcdonalds.csv"
const fs = require("fs")

app.use(bodyParser.json())

let change_columns = column =>
  column
    .split("")
    .filter(el => el != '"')
    .join("")

const converter = csv({
  noheader: true,
  headers: [
    "latittude",
    "langitude",
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
    latittude: column => Number(change_columns(column)),
    langitude: column => Number(change_columns(column)),
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

const port = process.env.PORT || 3007
app.listen(port, err => {
  err ? console.log("Server Down") : console.log("Server up and runing")
})

