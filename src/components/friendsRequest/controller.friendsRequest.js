const ServiceFriendsRequest = require('./service/friendRequest.service');
const UserServices = require('../users/service/user.service');
const boom= require('@hapi/boom');
const service = new ServiceFriendsRequest();
const serviceUser = new UserServices();
class ControllerFriendRequest{
    async sendRequest(id,username){
        const sendNewRequest = await serviceUser.getOneUsername(username);
        const user = await serviceUser.getOneUser(id);
        if(sendNewRequest.id === user.id){
            throw boom.notFound('No puedes enviar una solicitud a un mismo usuario');
            return false;
        }
        const saveRequest = await service.addFriendRequest(user,sendNewRequest);
        
        return {
            saveRequest
        };
    };

    async updateStatusFriendRequest(requestId,response){
        // const user = await serviceUser.getOneUser(userId);
        const updateStatus = await service.respondToFriendRequest(requestId,response);
        return updateStatus;
    }

    async deleteRequest(id){
        const remove = await service.removeFriendRequest(id);
        return {
            remove
        };
    }
}


module.exports = ControllerFriendRequest;