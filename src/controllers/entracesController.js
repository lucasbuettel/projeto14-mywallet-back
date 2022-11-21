import { db } from "../database/db.js";
import { entraceSchema } from "../app.js";

export async function postEntraces(req, res){
   
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
}

export async function getEntraces(req, res){
    try{
        const users = await db.collection("entraces").find().toArray();
        res.send(users);
    }
    catch (err){
        console.log(err);
    }
}
