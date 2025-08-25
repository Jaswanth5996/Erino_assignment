const User = require('./models/userSchema') 
const jwt = require('jsonwebtoken')

const protect = async(req,res,next) => {
    let token = req.cookies.token;
    if (token){
        try{
            const decode = jwt.verify(token, process.env.JWT_KEY)
            req.user = await User.findById(decode.id).select('-password')
            next();
        }
        catch(err) {res.status(401).json({error:"Token Failed",err})}
    }
    else{
        res.status(401).json({error:"Invalid Token!"})
    }

}

module.exports = protect;