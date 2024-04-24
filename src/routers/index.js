const express = require('express');

const messageRouter = require('../components/message/networks.message');
const userRouter = require('../components/users/networks.user');
const friendRequestRouter = require('../components/friendsRequest/networks.friendsRequest'); 
const chatRouter = require('../components/chats/networks.chats');
const authRouter = require('../components/auth/network.auth');
const Router = (app)=>{
    const router = express.Router();
    app.use('/api',router);
    router.use('/message',messageRouter);
    router.use('/user',userRouter);
    router.use('/friend-request',friendRequestRouter);
    router.use('/chat',chatRouter);
    router.use('/auth',authRouter);
};

module.exports = Router;