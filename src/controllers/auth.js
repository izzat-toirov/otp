import Auth from "../modules/auth.js";
import { decode, encode } from "../utils/auth.bcrypt.js";
import { catchError } from "../utils/error.response.js";
import { generatToken, refreshToken } from "../utils/generat.toke.js";
import { transporter } from "../utils/mailer.js";

export class AuthController {
    async sigUp(req, res){
        try {
            const { username, email, password } = req.body;
            const hash = await decode(password, 10);
            const newAuth = await Auth.create({
                username, email, password: hash
            });
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: newAuth
            });
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }
    async sigIn(req, res){
        try {
            const { email, password } = req.body;
            const auth = await Auth.findOne({ email });
            if(!auth){
                catchError(res, 401, 'Email, not found');
            }
            const isMatch = await encode(password, auth.password);
            if(!isMatch){
                catchError(res, 401, 'Invalid password');
            }
            const payload = { id: auth._id, username: auth.username };
            const generattoken = generatToken(payload);
            const reefreshtoken = refreshToken(payload);
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: generattoken, reefreshtoken
            });
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }
    async verify_otp(req, res){
        try {
            const mailMessage = {
                from: process.env.SMTP_USER,
                to: 'izzargamer49@gmail.com',
                subject: 'Full stack n20',
                text: 'Dangg'
            };
            transporter.sendMail(mailMessage, function(error){
                if(error){
                    catchError(res, 400, `Error or sending to mail: ${error}`);
                } else{
                    console.log(info);
                }
            });
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: null
            });
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }
}