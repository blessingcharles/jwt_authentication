const router = require('express').Router();
const users = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { json } = require('express');
const {register_validation , login_validation} = require('../validation');

router.post('/register',async (req,res)=>{
    //console.log('received something')
    const {error} =register_validation.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

//checking for same emails
    const user_exists = await users.findOne({email:req.body.email});
    if(user_exists) return res.status(400).send('email already exists');

    const salt =await bcrypt.genSalt(10);
    const hash_password =await bcrypt.hash(req.body.password,salt);


    const user = new users({
        name:req.body.name,
        email:req.body.email,
        password:hash_password,
        date:req.body.date
    })
    try
    {   //console.log(user);
        const saved_user = await user.save();
        res.send(saved_user);
    }
    catch(err){
        res.status(400).send(err);
    }


})


router.post('/login',async (req ,res) =>{

    const {error} =login_validation.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //validating email and passwords
    const user = await users.findOne({email:req.body.email});
    if(!user) return res.status(400).send('email or passsword is wrong');

    const passsword_check = await bcrypt.compare(req.body.password,user.password);
    if(!passsword_check) return res.status(400).send('passsword is wrong');

    const token = jwt.sign({
        _id:user._id
    },"secretkey");

    res.header('auth-token',token).send('success\n'+user.name) ;

    

})

module.exports = router;