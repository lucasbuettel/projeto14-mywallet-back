import express from "express";
import { MongoClient, ObjectId } from "mongodb";
/* import { postSingUp, getLogin } from "./controllers/authController";
import { postEntraces, getEntraces } from "./controllers/entracesController";
import { postOutputs, getOutputs } from "./controllers/outputsControllers"; */
import dotenv from "dotenv";
import cors from "cors";
import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from 'uuid';


const userSchema = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().required(),
    password: joi.string().required(),
    checkPassword: joi.string().required()
})

const entraceSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().min(2).required()
})

const outputSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().min(2).required()
})



const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);


try {
await mongoClient.connect();
console.log("MongoDB conected");
} catch (err) {
console.log("Erro no mongo.conect", err.message);
}

const db = mongoClient.db("MyWallet");
//const talCollection = db.collection("MyWallet");

// ROTAS:

app.post("/signUp", async (req, res) => {

    const {name, email, password, checkPassword} = req.body;
    const token = uuidV4();

    const user = {
        name,
        email,
        password,
        checkPassword 
    }

    const validation = userSchema.validate(user, {abortEarly: false});

    if(validation.error){
        const errors = validation.error.details.map((detail) => detail.message);
        res.status(422).send(errors);
        return;
    }

    const messageFrom = await db.collection("usersData").find().toArray();
    const userExists = messageFrom.find((e) => e.name === name);

    if (userExists) {
        res.status(409).send({ error: "Usuário já existe" });
        return;
    }

    try{
        await db.collection("usersData").insertOne(user); 
    
        res.sendStatus(201)
    }
    catch (err){
        res.send(err);
        res.sendStatus(422);
    }    
})


app.get("/login", async (req, res) => {

    try{
        const users = await db.collection("usersData").find().toArray();
        res.send(users);
    }
    catch (err){
        console.log(err);
    }   

});
 
app.post("/entraces", async (req, res) =>{
    const {value, description} = req.body;

    const entrace = {
        value,
        description
    }

    const validation = entraceSchema.validate(entrace, {abortEarly: false});

    if(validation.error){
        const errors = validation.error.details.map((detail) => detail.message);
        res.status(422).send(errors);
        return;
    }

    try{
        await db.collection("entraces").insertOne(entrace); 
    
        res.sendStatus(201)
    }
    catch (err){
        res.send(err);
        res.sendStatus(422);
    }
    

});

app.get("/entraces", async (req, res) =>{

    try{
        const users = await db.collection("entraces").find().toArray();
        res.send(users);
    }
    catch (err){
        console.log(err);
    }
    
});

app.post("/outputs", async (req, res) =>{
    const {value, description} = req.body;

    const output = {
        value,
        description
    }

    const validation = outputSchema.validate(output, {abortEarly: false});

    if(validation.error){
        const errors = validation.error.details.map((detail) => detail.message);
        res.status(422).send(errors);
        return;
    }

    try{
        await db.collection("outputs").insertOne(output); 
    
        res.sendStatus(201)
    }
    catch (err){
        res.send(err);
        res.sendStatus(422);
    }
    

});

app.get("/outputs", async (req, res) =>{

    try{
        const users = await db.collection("outputs").find().toArray();
        res.send(users);
    }
    catch (err){
        console.log(err);
    }
    
});





app.listen(process.env.PORT, () => console.log(`Server running in port: ${process.env.PORT}`));