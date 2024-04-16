import { Schema, model } from "mongoose";

const authorSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },

        LastName: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        dateOfBirth: {
            type: String,
            required: true
        },

        avatar: {
            type: String,
            required: true
        }
    },

    {
        collection: "authors"
    }
);


//Esporto modello chiamato "Author" che rispecchia lo schema authorSchema
export default model("Author", authorSchema);