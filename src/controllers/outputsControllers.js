import { db } from "../database/db.js";
import { outputSchema } from "../app.js";


export async function postOutputs(req, res){
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
    
}

export async function getOutputs(req, res){
    try{
        const users = await db.collection("outputs").find().toArray();
        res.send(users);
    }
    catch (err){
        console.log(err);
    }
}
