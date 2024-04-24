const boom = require('@hapi/boom');
const Model = require('../model/user.model');

 
class UserServices{ 
    async addUser(user){
        const myUser = new Model(user);
        myUser.save();
        return myUser;
    };

    async getUser(){
        const getUser = await Model.find();
        return getUser;
    };


    async getOneUser(id){
        const user = await Model.findById(id)
            .populate('messages',{message:1})
            .populate(
                {
                    path: 'friends',
                    populate:{
                        path:'user',
                        select:'name username',
                    },
                    select:'-friend'
                }
            )
            .populate(
                {
                    path: 'friendRequest',
                    populate:{
                        path: 'fromUser',
                        select:'name username id',
                    },
                    select:'-toUser'
                }
            )
            .populate(
                {
                    path:'chats',
                    populate:{
                        path:'messages',
                        populate:{
                            path:'user',
                            select:'username'
                        },
                        select:'-chat'
                    },
                    select:'-users'
                }
            ).exec();
        if(!user){
            throw boom.notFound('non-existent user');
        };
        return user;
    };

    async getOneUsername(username){
        const user = await Model.find({username:username})
        return user[0];
    }   

    async getOneUserEmail(email){
        const user = await Model.find({email:email});
        return user[0];
    }

    async updateUser(id,change){
        const updateUser = await Model.findOneAndUpdate(
            {_id:id},
            {name:change.name,
            date:new Date()},
            {new:true},
        );
        return updateUser;
    };

    async removeUser(id){
        const deleteUser = await Model.findByIdAndRemove({
            _id:id
        });

        return deleteUser;
    };

};

module.exports = UserServices;
