const mongoose=require('mongoose');
const connect=async function(){
    mongoose.connect('mongodb://localhost:27017/Authservice');
}
module.exports=connect;