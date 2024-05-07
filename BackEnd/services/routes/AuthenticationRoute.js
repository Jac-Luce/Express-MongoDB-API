import { Router } from "express";
import Author from "../models/AuthorsModel.js";
import bcrypt from "bcryptjs";
import { authMiddleware, generateJWT } from "../authentication/auth.js";

export const authRoute = Router();

//GET pagina di accesso
authRoute.get("/", async(req, res, next) => {
    res.send("Homepage");
});

//POST creazione nuovo utente con registrazione (vecchia POST/authors)
authRoute.post("/signIn", async(req, res, next) => {
    try {
        //Crea nuovo utente e cripta la password inserita per poterla salvare sul database
        let author = await Author.create({
            ...req.body,
            password: await bcrypt.hash(req.body.password, 10)
        });
        res.send(author).status(400);
    } catch (error) {
        next(error);
    }
});

//POST login dell'utente
authRoute.post("/login", async(req, res, next) => {
    try {
        //Cerca se l'utente esiste nel database tramite l'email inserita 
        let authorFound = await Author.findOne({
            email: req.body.email,
        });

        //Se l'utente esiste
        if(authorFound) {
            //Confronta la password inserita con quella che è salvata del database
            const passwordIsOk = await bcrypt.compare(req.body.password, authorFound.password);

            //Se la password coincide
            if(passwordIsOk) {
                //Genera token
                const token = await generateJWT({
                    email: authorFound.email //payload del token
                });
                res.send({user: authorFound, token});
            } else {
                //Se la password è sbagliata
                res.status(400).send("Password errata");
            }
        } else {
            //Se l'utente non è presente nel database
            res.status(400).send("Utente non trovato");
        }
    } catch (error) {
        next(error);
    }
});


//GET autenticazione necessaria per visualizzare il profilo utente
authRoute.get("/me", authMiddleware, async(req, res, next) => {
    try {
        let user = await Author.findById(req.author.id); // req.author è stato creato nel middleware nel momento in cui verifichiamo se l'utente è stato trovato
        res.send(user);
    } catch (error) {
        next(error);
    }
});