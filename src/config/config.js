require('dotenv').config();

const config = {
    port:process.env.PORT || 3000,
    userDB:process.env.USER_DB,
    passwordDB:process.env.PASSWORD_DB,
    uriDB:process.env.URI_DB,
    secretKey:process.env.SECRET_KEY,
};


module.exports = {config};