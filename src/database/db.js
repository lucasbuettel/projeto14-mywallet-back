/* import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
    await mongoClient.connect();
    console.log("MongoDB conected");
    } catch (err) {
    console.log("Erro no mongo.conect", err.message);
    }

    const db = mongoClient.db("MyWallet");
 */
