const express = require('express');
const {createServer} = require('http');
const path = require('path');
const {Server} = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const {config} = require('./config/config');
const Router = require('./routers');
const bodyParser = require('body-parser');
const { logErrors, boomErrorHandler, errorHandler } = require('./middleware/errror.handler');
const connectDB = require('./db/libs/mongo');
const authenticateToken = require('./middleware/authenticate.token');
require('./utils/auth')
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
connectDB();


// Login
app.get('/auth',
    async (req,res)=>{
        res.render(path.join(__dirname, 'views','templates','login'));
    }
);


app.get('/register',async (req,res)=>{
    res.render(path.join(__dirname, 'views','templates','register'));
    io.on('connection',socket=>{
        console.log(socket.id);
    });
});

app.get('/ChatOnline',
    authenticateToken,
    async(req,res)=>{
        res.render(path.join(__dirname,'views','templates'));
    },
);

Router(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

httpServer.listen(config.port, ()=>{
    console.log(config.port);
})
