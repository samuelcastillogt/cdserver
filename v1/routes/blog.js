import { Router } from "express"
const router = Router()
import { getAllData } from "../../blog/index.js"

router.get("/", async(req, res)=>{
    const data = await getAllData()
    res.send(data)
})

export default router