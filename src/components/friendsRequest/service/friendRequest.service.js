const boom = require('@hapi/boom');
const FriendRequestModel = require('../model/friendRequest.model');
const UserServices = require('../../users/service/user.service');
const FriendServices = require('../../friends/service/friend.service');
const serviceFriend = new FriendServices();
const serviceUser = new UserServices();


class ServiceFriendsRequest{
    async addFriendRequest(userId,username){
        const newRequets = {
            fromUser:userId._id,
            toUser:username._id,
            date:new Date(),
        }
        const friendRequest = await new FriendRequestModel(newRequets);
        await friendRequest.save(); 
        username.friendRequest = username.friendRequest.concat(friendRequest);
        await username.save();
        return friendRequest;
    };

    async removeFriendRequest(id){
        const deleteFriendRequest = await FriendRequestModel.findOneAndRemove({
            _id:id
        });

        return deleteFriendRequest;
    };

    async respondToFriendRequest(requestId,respondStatus){
        const friendRequest = await FriendRequestModel.findById(requestId)
            .populate('fromUser',{
                id:1,
                name:1,
                username:1,
                friends:1
            })
            .populate('toUser',{
                id:1,
                name:1,
                username:1
            });
        
        if(!friendRequest) {
            throw boom.notFound('Solicitud de amistad no encontrada');
            return false;
        }
            
        friendRequest.status = respondStatus;


        if(respondStatus === "accepted"){
            const fromUser = await serviceUser.getOneUser(
                friendRequest.fromUser.id
            );
            const toUser = await serviceUser.getOneUser(
                friendRequest.toUser.id
            );
            
            const friend = {
                user:fromUser,
                friend:toUser,
                date:new Date(),
            } 
            const yourFriend = {
                user:toUser,
                friend:fromUser,
                date:new Date(),
            }
            
            const addFriend = await serviceFriend.addFriend(friend,yourFriend,fromUser,toUser);
        }
        
        if(respondStatus === 'rejected'){
            const deleteRequest = await this.removeFriendRequest(requestId);
            return deleteRequest;
        }

        await friendRequest.save();

        return {
            request: friendRequest,
        }

    }
}


module.exports = ServiceFriendsRequest;