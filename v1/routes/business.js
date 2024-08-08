import { Router } from "express"
import { checkToken, verify } from '../../auth/index.js'
import serviceDb from "../../firebase/firebase.js"
const router = Router()
router.get("/",  async(req, res)=>{
    const data = await serviceDb.getAllData()
    res.send(data)
})
router.post("/edit/:id", verify,async(req, res)=>{
    const data = await serviceDb.editBusiness(req.body.data)
    res.send(data)
})
router.post("/add", verify,async(req, res)=>{
    const data = await serviceDb.saveBusiness(req.body.data)
    res.send(data)
})
router.get("/delete/:id", verify,async(req, res)=>{
    const data = await serviceDb.deleteBusiness(req.params.id)
    res.send(data)
})
router.get("/categories", async(req, res)=>{
    const data = await serviceDb.getCategories()
    res.send(data)
})
router.post("/dataToInfo", async(req, res)=>{
    const result = await serviceDb.saveDataLead(req.body.data)
    res.send(result)
})
export default router