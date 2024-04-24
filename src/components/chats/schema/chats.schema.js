const Joi = require('joi');


const id = Joi.string();


const getChatSchema = Joi.object({
    id:id.required(),
});



module.exports = {getChatSchema};