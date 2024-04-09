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
    }
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
UserSchema.path('favourite').validate(async function(value) {
    // Accessing the model instance (user) using `this`
    if (!this.isNew) {
        // If the user document is not new, skip the validation
        return true;
    }
    // Find if there are any duplicate entries in the favourite array
    const duplicateBooks = value.filter((bookId, index) => value.indexOf(bookId) !== index);
    // If there are duplicate books, return false
    return duplicateBooks.length === 0;
}, 'Duplicate books found in the favourite list');
const User = mongoose.model('User', UserSchema);
module.exports = User;

