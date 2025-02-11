import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    PIN: {
        type: String,
    },
    profilePhoto: {
        type: String,
    },
    assets: {
        type: Number
    },
    liabilities: {
        type: Number
    },
    cash: {
        type: Number
    },
    verified: {
        type: Boolean,
        default: false
    },
});
const User = mongoose.model('user', UserSchema);
export default User;