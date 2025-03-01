require('dotenv').config()
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    console.log("Authorization Header: ", req.headers.authorization)

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(403).json({
            message: "Invalid"
        })
        return;
    }

    const token = authHeader.split(' ')[1]
    console.log(token)

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = decoded.userId

        next()
    }catch(err){
        return res.status(403).json({
            message: `Error ${err}`
        })
    }
}

module.exports = {
    authMiddleware
}