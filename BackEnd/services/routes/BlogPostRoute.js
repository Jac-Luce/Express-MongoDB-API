import { Router } from "express";
import BlogPost from "../models/BlogPostModel.js";

export const blogPostRoute = Router();

blogPostRoute.get("/", async(req, res, next) => {
    try {
        let blogPostList = await BlogPost.find();
        res.send(blogPostList);
    } catch (error) {
        next(error);
    } 
});

blogPostRoute.get("/:id", async(req, res, next) => {
    try {
        let blogPost = await BlogPost.findById(req.params.id);
        res.send(blogPost);
    } catch (error) {
        next(error);
    }
});

blogPostRoute.put("/:id", async(req, res, next) => {
    try {
        let blogPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.send(blogPost);
    } catch (error) {
        next(error);
    }
});

blogPostRoute.delete("/:id", async(req, res, next) => {
    try {
        await BlogPost.deleteOne({
            _id: req.params.id,
        });
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

blogPostRoute.post("/", async(req, res, next) => {
    try {
        let blogPost = await BlogPost.create(req.body);
        res.send(blogPost).status(400);
    } catch (error) {
        next(error);
    }
});