const {model}=require('mongoose');
const User=require('../models/user');
class UserRepository{
    async createuser(data){
        try {
            const user=await User.create(data);
            return user;
        } catch (error) {
            console.log('something went wrong in repository layer');
            console.log(error);    
        }
    }
    async findby(email){
        try {
            console.log(email);
            const user=await User.findOne({email:email});
            return user;
        } catch (error) {
            console.log('something went wrong in repository layer');
            console.log(error); 
        }
    }
    async findbyId(data){
        try {
            const user=await User.findOne({userId:data});
            return user;
        } catch (error) {
            console.log('something went wrong in repository layer');
            console.log(error); 
        }
    }
   
    
}
module.exports=UserRepository;