const express=require('express');
const passport=require('passport');
const {PORT}=require('./src/config/serverconfig.js');
const {passportAuth}=require('./src/config/jwt-middleware.js');
const UserService=require('./src/services/userservice')
const userservice=new UserService();
const connect=require('./src/config/databaseconfig.js');
const bodyParser=require('body-parser');
const Apiroutes=require('./src/routes/index.js');
const UserRepository = require('./src/repository/user-repository.js');
 
const setupAndStartServer=async()=>{
    const app=express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(passport.initialize());
    passportAuth(passport);
    await connect();
    app.use('/api',Apiroutes);
    app.listen(PORT,()=>{     
        console.log("server started at PORT",PORT);
        });
       
        console.log("MongoDB connected");
}
setupAndStartServer();