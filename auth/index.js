import  Jwt  from "jsonwebtoken"
import  bcrypt from "bcrypt"
import {users} from "../firebase/user.js"
const myPlaintextPassword = "not_bacon";
export const login = async(user)=>{
    const userData = users.filter(item => user.name == item.name)
    if(userData.length == 0 ) return "Error"
    const data = await bcrypt.compare(user.pass, userData[0].pass)
    if(data){
        /// corregir por permisos
        const token = Jwt.sign({name: userData[0].name}, "chuvacacacaca", { expiresIn : "120m"})
        return token
    }else{
        return "Error"
    }
} 
export const verify = async(req, res, next)=>{
    if(req.headers.token == null) return res.sendStatus(401)
    Jwt.verify(req.headers.token, "chuvacacacaca", (err, user)=>{
        if(err) return res.sendStatus(401)
        req.user = user
        next()
    })   
}
export const checkToken = async(req, res, next)=>{
    Jwt.verify(req.headers.token, "chuvacacacaca", (err, user)=>{
        if(err) return res.sendStatus(401)
        req.token = user
        next()
    })
}


// bcrypt.genSalt(saltRounds, function(err, salt) {
    //     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
    //         console.log(hash)
    //     });
    // });