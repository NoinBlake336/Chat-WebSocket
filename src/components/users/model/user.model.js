const {Schema,model} = require('mongoose');
const { transformObject } = require('../../../middlewares/tranform.object');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username:{
        type:String,
        required: true,
        unique:true,
    },
    image:{
        type:String,
        required:false,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    friends:[{
        type:Schema.Types.ObjectId,
        ref:'FriendModel',
        required:false,
    }],
    friendRequest:[{
        type:Schema.Types.ObjectId,
        ref:'FriendRequest',
    }],
    chats:[{
        type:Schema.Types.ObjectId,
        ref:'ChatModel',
    }], 
    messages:[{
        type: Schema.Types.ObjectId,
        ref:'Message',
    }],
    date:Date,
});

userSchema.set('toJSON',{
    transform:transformObject.json,
})


const Model= model('User', userSchema);

module.exports = Model;