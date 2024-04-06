const UserRepository=require('../repository/user-repository');
class UserService{
      constructor(){
        this.userRepository=new UserRepository();
      }
      async signup(data){
        try {
            const user= await this.userRepository.createuser({
              email:data.email,
              password:data.password
            });
            return user;
        } catch (error) {
            console.log("something wrong in the Service layer");
            throw { error };
        }

      }

}
module.exports=UserService;