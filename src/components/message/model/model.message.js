const {Schema,model} = require('mongoose');
const { transformObject } = require('../../../middleware/tranform.object');

const messageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    message:{
        type:String, 
        required:true,
    },
    chat:{
        type:Schema.Types.ObjectId,
        ref:'ChatModel',
    },
    date:Date,
});

messageSchema.set('toJSON',{
    transform:transformObject.json,
})

const Model= model('Message', messageSchema);

module.exports = Model;