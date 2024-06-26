const jwt = require('jsonwebtoken');
const {config} =require('.././config/config');
const boom = require('@hapi/boom');

const authenticateToken = (req,res,next)=>{
    const token = req.headers['token'];
    if(token){
        jwt.verify(token,config.secretKey,(err,decoded)=>{
            if(err){
                throw boom.illegal('El token no es valido');
            };
            req.user = decoded;
            next(); 
        });
    }else{
        res.status(401);
    }
};

module.exports = authenticateToken;