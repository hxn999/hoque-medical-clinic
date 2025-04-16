import { Schema, model } from 'mongoose';



const procedureSchema = new Schema(
    {
        info1: {
            type: String,
            required: true,
            trim: true
        },
        info2: {
            type: String,
            required: true,
            trim: true
        },
        form1: {
            type: Array,
            required: true,
            
        },
        form2: {
            type: Array,
            required: true,
            
        }
    }
)

const Procedure = model("Procedure", procedureSchema)

export default Procedure