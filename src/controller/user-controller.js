const UserService=require('../services/userservice');
const userservice=new UserService();


const create=async(req,res)=>{
    try {
        const user=await userservice.signup(req.body);
        return res.status(201).json({
            data:user,
            message:"successfully signup"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:'Not able to create a book',
            err:error
        })
    }


}
module.exports={
    create
}