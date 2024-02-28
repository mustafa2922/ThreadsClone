import mongoose from "mongoose";
import Joi from "joi";

const { Schema } = mongoose;

const UserModel = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    imageURL: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    joinDate: {
        type: Date,
        default: Date.now()
    },
    following: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    verified: {
        type: Boolean,
        default: false
    },
    VerificationToken: String,
});

const UserSchemaValidator = Joi.object({
    name: Joi.string().required().min(6),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    imageURL: Joi.allow(),
});

const User = mongoose.model("User", UserModel);

export { User, UserSchemaValidator };