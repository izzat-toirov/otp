
import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

const Auth = mongoose.model('Auth', authSchema);

export default Auth;