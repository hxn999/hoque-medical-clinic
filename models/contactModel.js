import { Schema, model } from 'mongoose';




// Schema for Emergency Contact / Responsible Party
const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  bio: { type: String, required: false }
});



const Contact = model('Contact', contactSchema);

export  {

  Contact
};
