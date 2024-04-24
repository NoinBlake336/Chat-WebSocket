const Joi = require('joi');

const id = Joi.string();
const username = Joi.string();
const status = Joi.string();
const userId = Joi.string();

const addAFriendRequestSchema = Joi.object({
    id:id.required(),
    username:username.required(),
});

const getFriendRequestSchema = Joi.object({
    id:id.required(),
});

const updateFriendRequestSchema = Joi.object({
    status:status,
    // userId:userId.required(),
});


module.exports = {
    addAFriendRequestSchema,
    getFriendRequestSchema,
    updateFriendRequestSchema,
}

