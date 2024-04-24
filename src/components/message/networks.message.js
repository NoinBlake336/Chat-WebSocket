const express = require('express');
const router = express.Router();
const {getMessageSchema,createMessageSchema,updateMessageSchema} = require('./schema/message.schema');
const ControllerMessage = require('./controller.message');
const validatorHandler = require('../../middleware/validator.handler');
const controller = new ControllerMessage();
router.get('/', 
    async (req,res,next)=>{
        try{
            const messages = await controller.find();
            res.status(200).json(messages);
        }catch(err){
            next(err);
        }
    }
);

router.get('/:id',
    validatorHandler(getMessageSchema,'params'),
    async(req,res,next)=>{
        try{
            const {id} = req.params;
            const message = await controller.findOne(id);
            res.status(200).json(message);
        }catch(err){
            next(err);
        }
    }
);

router.post('/',
    validatorHandler(createMessageSchema,'body'),
    async (req,res,next)=>{
        try{

            const {user,message,chat} = req.body;
            const newMessage = await controller.create(user,message,chat); 
            res.status(201).json(newMessage);
        }catch(err){
            next(err);
        }
        
    }
);

router.patch('/:id',
    validatorHandler(getMessageSchema,'params'),
    validatorHandler(updateMessageSchema,'body'),
    async(req,res,next)=>{
        try{
            const {id}=req.params;
            const body=req.body;
            const updateMessage = await controller.update(id,body);
            res.status(201).json(updateMessage); 
        }catch(err){
            next(err);
        }
    }
);

router.delete('/:id',
    validatorHandler(getMessageSchema,'params'),
    async(req,res,next)=>{
        try{
            const {id}=req.params;
            const deleteMessage = await controller.delete(id);
            res.status(200).json(deleteMessage);
        }catch(err){
            next(err);
        }
    }
)





module.exports = router;