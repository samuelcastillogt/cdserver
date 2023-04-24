const express = require("express")
var cors = require('cors')
const app = express()
app.use(cors())
const serviceDb = require("./firebase/firebase")
app.get("/", async(req, res)=>{
    const data = await serviceDb.getAllData()
    res.send(data)
})
app.get("/categorie/:categorie", async(req, res)=>{
    const data = await serviceDb.getDataForCategorie(req.params.categorie)
    res.send(data)
})
app.get("/details/:id", async(req, res)=>{
    const data = await serviceDb.getDataForId(req.params.id)
    res.send(data)
})

app.listen(5000, ()=> console.log("Server is RUNNING in port 5000"))