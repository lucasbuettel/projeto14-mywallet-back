import { v4 as uuidV4 } from 'uuid';
import { db } from '../database/db.js';
import { userSchema } from '../app.js';
import bcrypt from "bcrypt";


const dataUserCollection = db.collection("usersData")


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

        
        if(validation.error){
            const errors = validation.error.details.map((detail) => detail.message);
            res.status(422).send(errors);
            return;
        }
        
        if (password !== checkPassword) {
            res.status(409).send({ message: "Confirmação de senha está errada" })
            return;
        }
        
        
        const nameUsers = await dataUserCollection.find().toArray();
        const nameUserExists = nameUsers.find((e) => e.name === name);
        
        if (nameUserExists) {
            res.status(409).send({ error: "Usuário já existe" });
            return;
        }

        const emailUsers = await dataUserCollection.find().toArray();
        const emailUserExists = emailUsers.find((e) => e.email === email);
        
        if (emailUserExists) {
            res.status(409).send({ error: "E-mail já cadastrado" });
            return;
        }


        const hashPassword = bcrypt.hashSync(user.password, 10);
        
    
        try{
            await dataUserCollection.insertOne({...user, password:hashPassword }); 
        
            res.sendStatus(201)
        }
        catch (err){
            res.send(err);
            res.sendStatus(422);
        }    
    }

export async function postLogin(req, res){
    const {email, password} = req.body;

    try{
        const userExists = await dataUserCollection.findOne({email});
        if(!userExists){
            return sendStatus(401);
        }
        const passwordOk = bcrypt.compareSync(password, userExists.password);

        if(!passwordOk){
            return res.sendStatus(401);
        }

        res.send({message: `Olá, ${userExists.name} seja bem vindo(a)`})

    } catch(err){
        console.log(err);
        res.sendStatus(401);
    }
}


export async function getLogin(req, res){
    
    try{
        const users = await dataUserCollection.find().toArray();
        res.send(users);
    }
    catch (err){
        console.log(err);
    }
}