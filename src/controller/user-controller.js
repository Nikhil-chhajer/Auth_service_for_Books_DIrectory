

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
const find=async(req,res)=>{
    try {
        const user=await userservice.findby(req.params.id);

        return res.status(201).json({
            data:user,
            message:"successfully user found"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:'Not able to found user',
            err:error
        })
    }


}
const review=async(req,res)=>{
    try {
        const userId=req.body.userId;
        const reviewId=req.body.reviewId
        console.log(userId,reviewId)
        const user=await userservice.reviewcreation(userId,reviewId);

        return res.status(201).json({
            data:user,
            message:"successfully user found"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:'Not able to found user',
            err:error
        })
    }
}




module.exports={
    create,signupforToken,favouritebook,find,review
}