import { Schema, model } from 'mongoose';

const authSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        }
    }
)

const Auth = model("Auth", authSchema)

export default Auth