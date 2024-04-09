
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
            message:'Not able to signup',
            err:error
        })
    }
}
const signupforToken=async(req,res)=>{
    try {
        const token=await userservice.signin(req.body);
        return res.status(201).json({
            data:token,
            message:"successfully signin"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:'Not able to create signin',
            err:error
        })
    }
    

}
const favouritebook=async(req,res)=>{
    try {
        
        const favouritebook=await userservice.favourite({userId:req.body.userId,bookId:req.body.bookId});
        return res.status(201).json({
            data:favouritebook,
            message:"successfully favorite book addded"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:'Not able to add the favourite book',
            err:error
        })
    }
    
}




module.exports={
    create,signupforToken,favouritebook
}