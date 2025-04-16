import { Schema, model } from 'mongoose';

const fileSchema  = new Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        type:{
            type:String,
            default:"preop"
        }
        ,
       url:{
        type:String,
        required:true,
        trim:true
       }
    }
)



const Fille = model("File",fileSchema)


export default Fille