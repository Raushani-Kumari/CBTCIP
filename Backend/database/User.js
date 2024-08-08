import mongoose from "mongoose";
import validator from "validator";

const Schema = mongoose.Schema;

const UserSchema  = new Schema({
    fname: {
        type: String,
        required: [true, "Name Required.."],
        minLength: [3, "Name must contain atleast 3 characters"],
    },
    lname: {
        type: String,
        
    },
    email: {
        type: String,
        required: [true, "Email Required.."],
        validate: [validator.isEmail, "Please provide valid email.."],
        unique: true
    },
    password: {
        type:String,
        required:[true, "Password Required.."],
    }
});

export const UserModel = mongoose.model('users', UserSchema);
// module.exports = UserModel;
