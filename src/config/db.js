import { connect } from "mongoose";

export const connectDB = async() => {
    try {
        await connect(process.env.MONGO_URL);
        console.log("DB connect");
    } catch (error) {
        console.log(`Error ${error}`);
    }
}