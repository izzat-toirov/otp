import express from "express";
import { config } from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routers/user.js";
import authRouter from "./routers/auth.js";
import { swaggerSpec, swaggerUi } from "./docs/swagger.js";


config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
connectDB();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/users', userRouter);
app.use('/', authRouter);

app.listen(PORT, ()=> console.log(`Server started ${PORT}`));