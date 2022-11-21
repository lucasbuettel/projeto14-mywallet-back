import { v4 as uuidV4 } from 'uuid';
import { db } from '../database/db.js';
import { userSchema } from '../app.js';



export async function postSingUp(req, res){
    

        const {name, email, password, checkPassword} = req.body;
        const token = uuidV4();
    
        const user = {
            name,
            email,
            password,
            checkPassword 
        }
    
        const validation = userSchema.validate(user, {abortEarly: false});

        if (password !== checkPassword) {
            res.status(409).send({ message: "Confirmação de senha está errada" })
            return;
        }
    
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
    }


export async function getLogin(req, res){
    
    try{
        const users = await db.collection("usersData").find().toArray();
        res.send(users);
    }
    catch (err){
        console.log(err);
    }
}