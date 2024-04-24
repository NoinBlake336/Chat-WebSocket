const ServicesChat = require('../chats/service/chat.service');
const UserServices = require('../users/service/user.service');
const ServiceMessages = require('./service/message.service');
const service = new ServiceMessages();
const USER = new UserServices(); 
const CHAT = new ServicesChat();
class ControllerMessage {
    async find() {
        const find = await service.getMessages();
        return {
            find
        }
    };

    async findOne(id){
        const message = await service.getOneMessage(id);
        return {message};
    }; 

    async create(id, message,chat) {
        const userId = await USER.getOneUser(id); 
        const chatId = await CHAT.getOneChat(chat);
        const fullMessage = {
            user: userId._id,
            message: message,
            chat:chat,
            date: new Date(),
        }

        const addMessage = await service.addMessage(fullMessage,userId,chatId);
        
        return {
            addMessage
        }
    };

    async update(id,changes){
        const update = await service.updateMessage(id,changes);
        return {update}
    }

    async delete(id){
        const remove = await service.removeMessage(id);
        return {
            message:"Deleted message"
        }
    }
}



module.exports = ControllerMessage;