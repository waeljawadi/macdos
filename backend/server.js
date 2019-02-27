const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const csv = require("csvtojson")
const converter = csv({
  noheader:true,
  headers:  ["latittude","langitude","macname","etat","adresse","ville","etatagain","phone"],
  ignoreColumns:/(etatagain)/,
  quote: "'",
  escape: '"',



  colParser:{
    "latittude": (column) => column.split('').filter( el =>  el != '"').join(''),
    "langitude": (column) => column.split('').filter( el =>  el != '"').join(''),
    "adresse":   (column) => column.split('').filter( el =>  el != '"').join(''),
    "macname":   (column) => column.split('').filter( el =>  el != '"').join(''),
    "ville":     (column) => column.split('').filter( el =>  el != '"').join(''),
    "etat":      (column) => column.split('').filter( el =>  el != '"').join(''),
    "phone":     (column) =>  column.split('').filter( el =>  el != '"').join(''),
    "etatagain":     (column) =>  column.split('').filter( el =>  el != '"').join(''),
    



}





})
const csvFilePath = "./assets/mcdonalds.csv"
converter.fromFile(csvFilePath).then(jsonObj => {
  app.get("/", (req, res) => {
    res.send(jsonObj)
  })
})
app.use(bodyParser.json())
app.listen(3000)
