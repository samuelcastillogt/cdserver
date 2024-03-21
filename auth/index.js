import  Jwt  from "jsonwebtoken"
import  bcrypt from "bcrypt"
import {users} from "../firebase/user.js"
const myPlaintextPassword = "not_bacon";
export const login = async(user)=>{
    var valor = null
    const userData = users.filter(item => user.name == item.name)
    // const response = await bcrypt.compare(user.pass, userData[0].pass    , function(err, result) {
    //     return result
    //     console.log(valor)
    // });
    const data = await bcrypt.compare(user.pass, userData[0].pass).then(function(result) {
        if(result == true){
            return Jwt.sign(userData[0].name, "chuvacachuvaca")
        }else{
            return "error"
        }
    });
    return data
} 


// bcrypt.genSalt(saltRounds, function(err, salt) {
    //     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
    //         console.log(hash)
    //     });
    // });