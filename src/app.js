import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import joi from "joi";

import authRouters from "./routes/authRoutes.js"
import entracesRoutes from "./routes/entracesRoutes.js"
import outputsRouters from "./routes/outputsRoutes.js"


export const userSchema = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().required(),
    password: joi.string().required(),
    checkPassword: joi.string().required()
})

export const entraceSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().min(2).required()
})


export const outputSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().min(2).required()
})

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(authRouters);
app.use(entracesRoutes);
app.use(outputsRouters);

app.listen(process.env.PORT, () => console.log(`Server running in port: ${process.env.PORT}`));