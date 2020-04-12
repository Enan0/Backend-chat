require('dotenv').config();
const cookieParser = require("cookie-parser");
const express =require('express');
const session =require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo')(session);
const connection = require('./database');

const app = express();
const URI = 'mongodb://localhost/chatApp';

//Configuration
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// app.use(cookie());
app.use(session({
    secret:process.env.SECRET_SESSION || "123" ,
    resave:true,
    saveUninitialized:true,
    store: new MongoStore({
        mongooseConnection:connection
    })
}))

//Port
app.set('port',process.env.PORT || 4000);


//Routes
app.use('/api/users',require('./routes/users_r'));
app.use('/api/mensajes',require('./routes/mensajes_r'));


module.exports = app;