const FriendModel = require('../model/friend.model');
const ControllerChat = require('../../chats/controller.chats');
const controller = new ControllerChat();
class FriendServices{
    async addFriend(friend,yourFriend,fromUser,toUser){
        const myFriend = new FriendModel(friend);
        const yourFriendUser = new FriendModel(yourFriend);
        myFriend.save();
        yourFriendUser.save();
        const chat = await controller.create(fromUser.id,toUser.id);
        
        toUser.friends = toUser.friends.concat(myFriend.id);
        fromUser.friends = fromUser.friends.concat(yourFriendUser.id);
        toUser.chats = toUser.chats.concat(chat.newChat._id);
        fromUser.chats = fromUser.chats.concat(chat.newChat._id);

        
        await toUser.save();
        await fromUser.save();
        

        return myFriend;
    }
};



module.exports = FriendServices;