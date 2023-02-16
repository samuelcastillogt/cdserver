const express = require("express")
const app = express()
const serviceDb = require("./firebase/firebase")
app.get("/", async(req, res)=>{
    await serviceDb.prueba()
    res.send("Aqui esta")
})
app.listen(5000, ()=> console.log("Server is RUNNING in port 5000"))