import express from "express";
import { config } from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routers/user.js";
import authRouter from "./routers/auth.js";
import { swaggerSpec, swaggerUi } from "./docs/swagger.js";
import logger from "./utils/logger/logger.js"


config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
connectDB();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/users', userRouter);
app.use('/', authRouter);

process.on('uncaughtException', (err) => {
    if (err) console.log(`Uncaught expetion: ${err}`);
    process.exit(1);
  });
  
  process.on('unhandledRejection', (reasion, promise) => {
    console.log(`Unhandled rejection: ${reasion}`);
  });
  
  app.use((err, req, res, next) => {
    if (err) {
      return res
        .status(500)
        .json({ eror: err.message || 'Internal server error' });
    } else {
      next();
    }
  });
  
  
  app.listen(PORT, logger.info(`Server started ${PORT}`));