const jwt = require('jsonwebtoken');

module.exports =(req,res,next)=>{

    const token = req.header('auth-token');
    if(!token) return res.status(400).send('token not found');

    try{
        const verified = jwt.verify(token,"secretkey");
        res.body = verified ;
        next();

    }

    catch(err){

        res.status(400).send('invalid token');

    }

}