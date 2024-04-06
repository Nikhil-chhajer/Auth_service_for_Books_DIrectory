const Usercontroller=require('../../controller/user-controller');
const express=require('express');
const router=express.Router();
router.post('/signup',Usercontroller.create);
module.exports=router;