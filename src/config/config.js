require('dotenv').config();

const config = {
    port:process.env.PORT || 3000,
    uriDB:process.env.URI_DB || "mongodb+srv://noinblake-336:RNr2vebyd9K6EdZt@cluster0.xaxibxw.mongodb.net/?retryWrites=true&w=majority",
    secretKey:process.env.SECRET_KEY,
};


module.exports = {config};