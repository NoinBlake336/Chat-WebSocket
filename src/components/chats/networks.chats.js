const express = require('express');
const router = express.Router();
const validatorHandler = require('../../middleware/validator.handler');
const {getChatSchema} = require('./schema/chats.schema'); 
const ControllerChat = require('./controller.chats');
const controller = new ControllerChat();
router.get('/:id',
    validatorHandler(getChatSchema, 'params'),
    async(req,res,next)=>{
        try{
            const {id}=req.params;
            const getChat = await controller.findOne(id);
            res.status(200).json(getChat);
        }catch(err){
            next(err);
        };
    },
);

router.post('/',
    async(req,res,next)=>{
        try{
            const {user,member} = req.body;
            const newChat = await controller.create(user, member);
            res.status(201).json(newChat);
        }catch(err){
            next(err);
        };
    },
);



module.exports = router;