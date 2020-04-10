require('dotenv').config();
const express =require('express');
const session =require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo')(session);

const app = express();
const URI  = process.env.dbUri;

//Configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(session({
    secret:process.env.SECRET_SESSION || "123" ,
    resave:true,
    saveUninitialized:true,
    store: new MongoStore({
        url:URI,
        autoReconnect:true
    })
}))

//Port
app.set('port',process.env.PORT || 4000);


//Routes
app.use('/api/users',require('./routes/users_r'));


module.exports = app;