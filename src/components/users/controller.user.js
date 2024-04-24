const bcrypt = require('bcrypt');
const UserServices = require("./service/user.service");
const service = new UserServices();

class ControllerUser{
    async find(){
        const find = await service.getUser();
        return {
            find
        };
    };  

    async findOne(id){
        const user = await service.getOneUser(id); 
        return {user};
    };

    async create(user,usern,image,email,password){
        const newUser = {
            name:user,
            username:usern,
            image:image,
            email:email,
            password:password,
            date:new Date(),
        };

        if(password){
            const hash = await bcrypt.hash(password,10);
            newUser.password=hash;
        }
        console.log(newUser);
        const addUser = await service.addUser(newUser);

        return {
            addUser
        };
    };


    async getUsername(username){
        const user = await service.addFrineds(username);
        return {user};
    }

    async update(id,changes){
        const update = await service.updateUser(id,changes);
        return {update};
    };

    async delete(id){
        const remove = await service.removeUser(id);
        return {
            message: `Delete user`,
        }
    }
}


module.exports = ControllerUser;