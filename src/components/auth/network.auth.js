const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {config} = require('../../config/config');

router.post('/',
    passport.authenticate('local',{session:false}),
    async(req,res,next)=>{
        try{
            const user = req.user;
            const payload = {
                sub:user.id,
            };
            const token = jwt.sign(payload,config.secretKey,{expiresIn:'7min'});
            res.status(201).json({
                user:user.id,
                token:token,
            })
        }catch(err){
            next(err);
        }
    }
);

module.exports = router;