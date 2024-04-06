const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});
UserSchema.pre('save',async function(next){
    const user=this;
    const SALT= await bcrypt.genSalt(9);
    const encryptPassword= bcrypt.hashSync(user.password,SALT);
    user.password=encryptPassword;
    next();
});
UserSchema.methods.comparePassword=function compare(password){
    return bcrypt.compareSync(password,this.password);
}

const User=mongoose.model('User',UserSchema);
module.exports=User;

