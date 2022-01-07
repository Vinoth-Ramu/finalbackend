const jwt = require('jsonwebtoken')

exports.AuthorizeUser = async (req,res,next) => {
    // Check whether token exists
    if(!req.headers['access-token']) return res.status(401).send({msg : "Unauthorised"});
    
    // Verify Token
    try {
        req.body.user = await jwt.verify(req.headers['access-token'], "SWERA");
        next()
    } catch(err){
        res.send(err);
    }
}