const router = require('express').Router();
const verify_token = require('./verify_token')

router.get('/',verify_token, (req,res,next)=>{

    res.json({"secret":"gbetbgrtrt"});

})

module.exports = router ;