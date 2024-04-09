const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favourite:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Books',
    
    }
    ],
    userId:{
        type:String,
        required:true
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review',
        }
    ]
}, { timestamps: true });
UserSchema.pre('save', async function (next) {
    const user = this;
    const SALT = await bcrypt.genSalt(9);
    const encryptPassword = bcrypt.hashSync(user.password, SALT);
    user.password = encryptPassword;
    next();
});
UserSchema.methods.comparePassword = function compare(password) {
    return bcrypt.compareSync(password, this.password);
}
UserSchema.methods.genJWT = function generate() {
    return jwt.sign({id:this.id,email:this.email},'Auth_Service',{
        expiresIn:'1h'
    });
}

const User = mongoose.model('User', UserSchema);
module.exports = User;

