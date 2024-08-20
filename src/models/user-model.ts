import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    platform: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true
    }
});

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Second name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    profileImg:{
        type: String
    },
    links: [linkSchema]
});

const User = mongoose.model('User', userSchema);
export default User;
