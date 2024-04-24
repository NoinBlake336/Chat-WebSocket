const Joi = require('joi');

const id = Joi.string();
const message = Joi.string().min(1);
const user = Joi.string().min(4);
const chat = Joi.string();
const getMessageSchema = Joi.object({
    id:id.required(),
});

const createMessageSchema = Joi.object({
    user:user.required(),
    message:message.required(),
    chat:chat.required(),
});

const updateMessageSchema = Joi.object({
    message:message,
});

module.exports = {getMessageSchema,createMessageSchema,updateMessageSchema};