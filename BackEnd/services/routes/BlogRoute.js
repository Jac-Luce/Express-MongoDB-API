import { Router } from "express";
import Author from "../models/AuthorsModel.js"

export const blogRoute = Router();

blogRoute.get("/", async(req, res) => {
    res.send("Lista autori")
});

blogRoute.get("/:id", async(req, res, next) => {
    try {
        let author = await Author.findById(req.params.id);
        res.send(author);
    } catch (error) {
        next(error);
    }
});

blogRoute.post("/", async(req, res, next) => {
    try {
        let author = await Author.create(req.body);
        res.send(author).status(400);
    } catch (error) {
        next(error);
    }
});