import { Router } from "express"
import user from "./routes/user.js"
import busines from "./routes/business.js"
import blog from "./routes/blog.js"
import categorias from "./routes/categories.js"
import SwaggerDocs from "./swagger.js"
const router = Router()

router.get("/", (req, res) => {
    res.send("<h1>Welcome to frist version API</h1>")
})
router.use("/user", user)
router.use("/business", busines)
router.use("/blog", blog)
router.use("/blog", blog)
router.use("/categories", categorias)
export default router