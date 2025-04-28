
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    role: { type: String, enum: ['superadmin', 'admin'], default: 'admin', required: true }
});

const User = mongoose.model('Users', userSchema);

export default User;