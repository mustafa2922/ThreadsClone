import mongoose from "mongoose";

const { Schema } = mongoose;

const PostModel = new Schema({
    content: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    replies: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
            content: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now,
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model("Post", PostModel);

export { Post }