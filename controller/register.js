const arr = [];
const bcrypt = require("bcrypt");
const saltRounds = 10;
//const secretKey = "kiranrupnar";
const jwt = require("jsonwebtoken");

const register = async (req,res) =>{
    const details = req.body;
    const user = arr.find((items)=>{               // will get individual array items 
        return details.email === items.email       // will give a boolean value & we use this to check if the email user is entering is present in the details or not
    })
    if(user){
        return res.status(200).send({message:"User already registered,Please try to login!!"})
    }
    
    const hashedPassword = await bcrypt.hash(details.password,saltRounds)

    const obj ={
        name : details.name,
        phone : details.phone,
        email : details.email,
        password : hashedPassword
    }
    arr.push(obj);
    console.log(arr)
    res.send(arr)
}

const login = async (req,res) =>{
    const details = req.body;
    const user = arr.find((items)=>{
        if(details.email === items.email){
            return items
        }
        else{
            return res.send({message:"User is not registered,Register first!!"})
        }
    })
    const checkUser = await bcrypt.compare(details.password,user.password)
    if(checkUser){
        const token = await jwt.sign(user.email,secretKey)
        return res.send({token : token , message:"User logged in successfully!!"})
    }
     return res.send({message : "Password does not match,Try entering the correct password!!"})
}

module.exports = {register,login}
