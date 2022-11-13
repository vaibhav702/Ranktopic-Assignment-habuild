const jwt = require("jsonwebtoken")
const secretKey = 'ranktopicassignment'


const userAuth = function(req, res, next) {
    try {
        const token = req.headers['x-api-key'] 
      
        if (!token) {
            return res.status(403).send({ status: false, message: `Missing authentication token in request` })
        }

        const decoded = jwt.verify(token, secretKey); 
        if (!decoded) {
            return res.status(400).send({ status: false, message: "Invalid authentication token in request headers." })
        }
        if (Date.now() > (decoded.exp) * 1000) { 
            return res.status(403).send({ status: false, message: "Session expired! Please login again." })
        }

        req.userId = decoded.userId;
        req.email = decoded.email;
        next()

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = {
    userAuth
}