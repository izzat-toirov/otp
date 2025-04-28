import User from "../modules/user.js";
import { catchError } from "../utils/error.response.js";
// import { userValid } from "../utils/user.valid.js";

export class UserController {
    async create(req, res) {
        try {
            const { name, color, price, role } = req.validatedData;;
            const newUser = new User({ name, color, price, role });
            await newUser.save();
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: newUser
            });
        } catch (error) {
            console.log(error);
            
            catchError(res, 500, error.message);
        }
    }
    async getAll(req, res) {
        try {
            const user = await User.find();
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: user
            });
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }
    async getById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if(!user){
                catchError(res, 403, 'User not found');
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: user
            });
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }
    async uptade(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) {
                return catchError(res, 403, 'User not found');
            }
    
            const updatedUser = await User.findByIdAndUpdate(id, req.validatedData, { new: true });
    
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: updatedUser
            });
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params
            const user = await User.findById(id);
            if(!user){
                catchError(res, 403, 'User not found');
            }
            const deleted = await User.findByIdAndDelete(id);
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: deleted
            });
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }
}