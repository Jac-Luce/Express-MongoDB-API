import express  from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { blogRoute } from "./backendServices/routes/BlogRoute.js";

//Inizializziamo la gestione dei file .env
config();

//Crea una porta
const PORT = process.env.PORT || 3001;

//Crea il server
const app = express();

//Abilita la comunicazione con dati JSON
app.use(express.json());

//Importa Routes
app.use("/authors", blogRoute);


const initServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Sei connesso al database.");

        //Abilita server
        app.listen(PORT, () => {
        console.log("Il nostro server sta ascoltando alla porta " + PORT);
        });
    } catch (error) {
        console.error("Connessione al database fallita!", error);
    }
};

initServer();