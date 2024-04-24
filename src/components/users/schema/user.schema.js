const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().min(4);
const username = Joi.string().min(4);
const email = Joi.string();
const password = Joi.string().min(8);
const img = Joi.string();

const getUserSchema = Joi.object({
    id:id.required(),
    username
});

const createUserSchema = Joi.object({
    name:name.required(),
    username:username.required(),
    email:email.required(),
    password:password.required(),
    image:img,
});

const updateUserSchema = Joi.object({
    name:name,
    username:username,
    email:email,
    password:password,
    image:img,
});

module.exports = {getUserSchema,createUserSchema,updateUserSchema};