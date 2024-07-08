import mongoose from 'mongoose';
const { Schema } = mongoose;

const TokenSchema = new Schema({
    userName: {
        type: String,
        required: true,
        ref: "user",
        unique: true
    },
    email: {
        type: String,
        required: true,
        ref: "user",
        unique: true,
    },
    token: {
        type: String,
        required: true
    }
});

const Token = mongoose.model('token', TokenSchema);
export default Token;