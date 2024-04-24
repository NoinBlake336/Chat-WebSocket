const express = require('express');
const { getUserSchema, updateUserSchema, createUserSchema } = require('./schema/user.schema');
const ControllerUser = require('./controller.user');
const validatorHandler = require('../../middleware/validator.handler');
const controller = new ControllerUser();
const router = express.Router();

router.get('/:id',
    validatorHandler(getUserSchema,'params'),
    async(req,res,next)=>{
        try{
            const {id} = req.params;
            const user = await controller.findOne(id);
            res.status(200).json(user);
        }catch(err){
            next(err);
        };
    },  
);


router.post('/',
    validatorHandler(createUserSchema,'body'),
    async(req,res,next)=>{
        try{
            const body = req.body;
            const {name,username,image,email,password} = body;
            const newUser = await controller.create(name,username,image,email,password);
            res.status(201).json(newUser);
        }catch(err){
            next(err);
        };
    }
);


router.patch('/:id',
    validatorHandler(getUserSchema,'params'),
    validatorHandler(updateUserSchema,'body'),
    async(req,res,next)=>{
        try{
            const {id} = req.params;
            const body = req.body;
            const updateUser = await controller.update(id,body);
            res.status(201).json(updateUser);
        }catch(err){
            next(err);
        };
    }
);

router.delete('/:id',
    validatorHandler(getUserSchema,'params'),
    async(req,res,next)=>{
        try{
            const {id} = req.params;
            const deleteUser = await controller.delete(id);
            res.status(200).json(deleteUser);
        }catch(err){
            next(err);
        };
    },
);


module.exports = router;