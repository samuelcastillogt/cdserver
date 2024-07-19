import { Router } from "express"
import { checkToken, verify } from '../../auth/index.js'
import { categorias } from "../../utils/categorias.js"
const router = Router()
router.get("/",  verify, async(req, res)=>{
    res.send(categorias)
})
export default router