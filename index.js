const express = require("express")
const app = express()
app.get("/", (req, res)=>{
    res.send("Aqui esta")
})
app.listen(5000, ()=> console.log("Server is RUNNING in port 5000"))