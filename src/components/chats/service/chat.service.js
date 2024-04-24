const boom = require('@hapi/boom');
const ChatModel = require('../model/chats.model');




class ServicesChat{
    async addChat(chat){
        const myChat = await new ChatModel(chat);
        await myChat.save();
        return myChat;
    }

    async getOneChat(id){
        const chat = await ChatModel.findById(id)
            .populate({
                path:'messages',
                populate:{
                    path:'user',
                    select:'username'
                },
                select:'-chat'
            })
        
        if(!chat){
            throw boom.notFound('non-existent chat');
            return false;
        };

        return chat;
    };
};


module.exports = ServicesChat;