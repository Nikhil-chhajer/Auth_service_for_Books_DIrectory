const Usercontroller=require('../../controller/user-controller');
const express=require('express');
const router=express.Router();
const {authenticate}=require('../../config/authenticate');

router.post('/signup',Usercontroller.create);
router.post('/signin',Usercontroller.signupforToken);
router.post('/favourite',authenticate,Usercontroller.favouritebook);
router.get('/:id',Usercontroller.find);
router.post('/reviewcreate',authenticate,Usercontroller.review);
module.exports=router;