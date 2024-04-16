import { Router } from "express"
const router = Router()
import { checkToken, verify } from '../../auth/index.js'

router.post("/login", async(req, res)=>{
    const {user} = req.body
    console.log(user)
    const token = await login(user)
    res.send(token)
})
router.post("/check", checkToken, async(req, res)=>{
    const {token} = req.token
    const validated = token
    res.send(validated)
})
router.get("/test", (req, res) => {
    res.send("AHaHAHA")
})
export default router