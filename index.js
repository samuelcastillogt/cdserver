
import express from 'express'
import cors from "cors"
import 'dotenv/config'
import { checkToken, verify } from './auth/index.js'
import serviceDb from './firebase/firebase.js'
import {login} from "./auth/index.js"
import { getAllData } from './blog/index.js'
import SwaggerDocsV1 from './v1/swagger.js'
const app = express()
app.use(cors())
app.use(express.json())
console.log(process.env)
//// news routers
import v1 from "./v1/index.js"
/// to delete 

app.get("/",  async(req, res)=>{
    const data = await serviceDb.getAllData()
    res.send(data)
})
app.post("/edit/:id", verify,async(req, res)=>{
    const data = await serviceDb.editBusiness(req.body.data)
    res.send(data)
})
app.post("/add", verify,async(req, res)=>{
    const data = await serviceDb.saveBusiness(req.body.data)
    res.send(data)
})
app.get("/delete/:id", verify,async(req, res)=>{
    const data = await serviceDb.deleteBusiness(req.params.id)
    res.send(data)
})
app.get("/blog", async(req, res)=>{
    const data = await getAllData()
    res.send(data)
})
app.post("/login", async(req, res)=>{
    const {user} = req.body
    console.log(user)
    const token = await login(user)
    res.send(token)
})
app.post("/check", checkToken, async(req, res)=>{
    const {token} = req.token
    const validated = token
    res.send(validated)
})
app.get("/categories", async(req, res)=>{
    const data = await serviceDb.getCategories()
    res.send(data)
})
//////

app.get("/autor/:id", async(req, res)=>{
    const data = await serviceDb.getAllDataByAutor(req.params.id)
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
app.get("/blog/:id", async(req, res)=>{
    const data = await serviceDb.getBlogForId(req.params.id)
    res.send(data)
})

app.post("/createpost", async(req, res)=>{
    const data = await serviceDb.savePost(req.body)
    res.send("listo")
})
app.post("/createblogpost", async(req, res)=>{
    const data = await serviceDb.saveBlogPost(req.body)
    res.send("listo")
})

//// new routes
app.use("/v1", v1)
app.listen(4000, ()=> {
    console.log("Server is RUNNING in port 4000")
    SwaggerDocsV1(app, 4000)
})