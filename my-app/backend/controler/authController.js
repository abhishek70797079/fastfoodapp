const { validationResult } = require('express-validator');
const User = require('../models/User')
const userController = async(req,res)=>{

   try {
    const {name, email, password, location} = req.body;
    const user = await User({name,email,password,location}).save();
    res.status(200).send(({
        success:true,
        message:" user register successfully",
        user,
    }))
   } catch (error) {
    console.log(error)
   }
     
    

}

module.exports = userController;