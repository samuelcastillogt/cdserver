
import express from 'express'
import cors from "cors"
const app = express()
app.use(cors())
app.use(express.json())
import serviceDb from './firebase/firebase.js'
import {login} from "./auth/index.js"
app.get("/", async(req, res)=>{
    const data = await serviceDb.getAllData()
    res.send(data)
})
app.get("/blog", async(req, res)=>{
    const data = await serviceDb.getAllDataBlog()
    res.send(data)
})
app.get("/autor/:id", async(req, res)=>{
    const data = await serviceDb.getAllDataByAutor(req.params.id)
    res.send(data)
})
app.post("/edit/:id", async(req, res)=>{
    const data = await serviceDb.editBusiness(req.body.data)
    console.log(data)
    res.send(data)
})
app.post("/add", async(req, res)=>{
    const data = await serviceDb.saveBusiness(req.body.data)
    res.send(data)
})
app.get("/delete/:id", async(req, res)=>{
    const data = await serviceDb.deleteBusiness(req.params.id)
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
app.get("/categories", async(req, res)=>{
    const data = await serviceDb.getCategories()
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
app.post("/login", async(req, res)=>{
    const {user} = req.body
    const token = await login(user)
    res.send(token)
})
app.listen(4000, ()=> console.log("Server is RUNNING in port 4000"))