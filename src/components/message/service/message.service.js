const boom = require('@hapi/boom');
const Model = require('../model/model.message');

class ServiceMessages {
    async addMessage(message,userId,chatId){
        const myMessage = await new Model(message);
        myMessage.save();
        userId.messages = userId.messages.concat(myMessage._id);
        chatId.messages = chatId.messages.concat(myMessage._id);
        await userId.save();
        await chatId.save();
        return myMessage;
    } 

    async getMessages(){
        const getMessages = await Model.find().populate('user',
            {name:1}
        ).exec();
        return getMessages;
    }

    async getOneMessage(id){
        const message = await Model.findById(id).populate('user',{
            name:1
        });
        if(!message){
            throw boom.notFound('non-exixtent message');
        };
        return message;
    }

    async updateMessage(id,change){
        const updateMessage = await Model.findOneAndUpdate(
            {_id:id},
            {message:change.message,
            date:new Date()},
            {new:true},
        );
        return updateMessage;
    }

    async removeMessage(id){
        const deleteMessage = await Model.findOneAndRemove({
            _id:id
        });
        
        return deleteMessage;
    }
};


module.exports = ServiceMessages;