const ServicesChat = require("./service/chat.service");
const service = new ServicesChat();


class ControllerChat{
    async findOne(id){
        const chat = await service.getOneChat(id);
        return {chat};
    }

    async create(userl,member){
        const listChat = {
            users:[
                userl,member
            ]
        }
        const newChat = await service.addChat(listChat);
        return {newChat}
    }
};


module.exports = ControllerChat;