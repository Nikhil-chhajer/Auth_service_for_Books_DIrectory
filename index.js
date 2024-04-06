const express=require('express');
const {PORT}=require('./src/config/serverconfig.js')
const connect=require('./src/config/databaseconfig.js');
const bodyParser=require('body-parser');
const Apiroutes=require('./src/routes/index.js');
const setupAndStartServer=async()=>{
    const app=express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    await connect();
    app.use('/api',Apiroutes);
    app.listen(PORT,()=>{     
        console.log("server started at PORT",PORT);
        });
       
        console.log("MongoDB connected");
}
setupAndStartServer();