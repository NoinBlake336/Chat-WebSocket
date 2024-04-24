const express = require('express');
const router = express.Router();
const validatorHandler = require('../../middleware/validator.handler');
const {addAFriendRequestSchema, getFriendRequestSchema, updateFriendRequestSchema} = require('./schema/friendRequest.schema')
const ControllerFriendRequest = require('./controller.friendsRequest');
const controller = new ControllerFriendRequest();
router.post('/',
    validatorHandler(addAFriendRequestSchema,'body'),
    async(req,res,next)=>{
        try{
            const {id,username} = req.body;
            const newFriendsRequest = await controller.sendRequest(id,username);
            res.status(201).json(newFriendsRequest);
        }catch(err){
            next(err);
        }
    },
);

router.patch('/:id',
    validatorHandler(getFriendRequestSchema,'params'),
    validatorHandler(updateFriendRequestSchema,'body'),
    async(req,res,next)=>{
        try{
            const {id} = req.params;
            const {status} = req.body;
            const respondRequest = await controller.updateStatusFriendRequest(id,status);
            res.status(200).json(respondRequest);
        }catch(err){
            next(err);
        };
    },
);


router.delete('/:id',
    validatorHandler(getFriendRequestSchema,'params'),
    async(req,res,next)=>{
        try{
            const {id} = req.params;
            const deleteRequest = await controller.deleteRequest(id);
            res.status(200).json(deleteRequest);
        }catch(err){
            next(err);
        };
    },
);

module.exports = router;