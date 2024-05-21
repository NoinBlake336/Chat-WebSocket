const {Schema,model} = require('mongoose');
const { transformObject } = require('../../../middlewares/tranform.object');



const friendsResquest = new Schema({
    fromUser:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    toUser:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require:true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    date:{
        type:Date, 
        required:true,
    },
});

friendsResquest.set('toJSON',{
    transform:transformObject.json,
});

const FriendRequestModel = model('FriendRequest', friendsResquest);

module.exports = FriendRequestModel;
