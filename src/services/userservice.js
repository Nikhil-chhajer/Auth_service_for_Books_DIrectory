const UserRepository = require('../repository/user-repository');
const axios = require('axios'); // Import axios if not already imported

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signup(data) {
        try {
            const user = await this.userRepository.createuser({
                email: data.email,
                password: data.password,
                userId:data.userId
            });
            return user;
        } catch (error) {
            console.log("something wrong in the Service layer");
            throw error;
        }
    }

    async signin(data) {
        try {
            const user = await this.userRepository.findby(data.email);
            if (!user) {
                throw {
                    message: 'User not found',
                }
            }
            const passwordmatch = await user.comparePassword(data.password);
            if (!passwordmatch) {
                throw {
                    message: 'Password not match',
                }
            }
            const token = await user.genJWT();
            return token;

        } catch (error) {
            console.log("something wrong in the Service layer");
            throw error;
        }
    }

    async favourite(data) {
        try {
            const book = await axios.get(`http://localhost:3000/api/v1/${data.bookId}`);
            const user=await this.userRepository.findbyId(data.userId);
            const favoriteBookIds = user.favourite.map(objectids => objectids.toString());
            for(let i=0;i<favoriteBookIds.length;i++){
      
                if(favoriteBookIds[i]===book.data.data._id.toString()){
                  throw{message:"Book already added in favourite section"}

                }
            }
           
            await user.favourite.push(book.data.data);
            await user.save();
            return book.data.data;

        } catch (error) {
            console.log("something wrong in the Service layer");
            throw error;
        }
    }
}
module.exports=UserService;