const {Schema,model} = require('mongoose');
const { transformObject } = require('../../../middleware/tranform.object');

const friendSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    friend:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    date:Date,
});

friendSchema.set('toJSON',{
    transform:transformObject.json,
})


const Model= model('FriendModel', friendSchema);

module.exports = Model;