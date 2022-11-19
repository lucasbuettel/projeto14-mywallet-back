import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import { postSingUp, getLogin } from "./controllers/authController";
import { postEntraces, getEntraces } from "./controllers/entracesController";
import { postOutputs, getOutputs } from "./controllers/outputsControllers";
import dotenv from "dotenv";
import cors from "cors";
import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from 'uuid';


const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

try {
await mongoClient.connect();
console.log("MongoDB conected");
} catch (err) {
console.log("Erro no mongo.conect", err.message);
}

db = mongoClient.db("MyWallet");
//const talCollection = db.collection("MyWallet");

// ROTAS:

app.post("/signUp", postSingUp);
app.get("/login", getLogin);
app.post("/entraces", postEntraces);
app.get("/entraces", getEntraces);
app.post("/outputs", postOutputs);
app.get("/outputs", getOutputs);


app.listen(process.env.PORT, () => console.log(`Server running in port: ${process.env.PORT}`));