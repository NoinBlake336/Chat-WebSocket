const {Schema,model} = require('mongoose');
const { transformObject } = require('../../../middlewares/tranform.object');

const chatSchema = new Schema({
    users:[{
        type: Schema.Types.ObjectId,
        ref:'User',
    }],
    messages:[{
        type: Schema.Types.ObjectId,
        ref:'Message',
    }]
});

chatSchema.set('toJSON',{
    transform:transformObject.json,
});


const ChatModel = model('ChatModel', chatSchema);
module.exports = ChatModel;
