import { Schema, model } from 'mongoose';


// Schema for List of Medications
const medicationSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  surgery: { type: String, required: true },
  medicalCondition: { type: String, required: true },
  allergy: { type: String, required: true },
  alcohol:{type:Boolean,default:false},
  tobacco:{type:Boolean,default:false},
  relational:{type:Boolean,default:false},
  none:{type:Boolean,default:true},
  why: { type: String, required: true },
  
});
const drugSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
 drugs:[{
    name:{type:String},
    dose:{type:String}
 }]
  
});

// Schema for Registration Details
const registrationSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  primaryCareMD: { type: String, required: false },
  maritalStatus: { type: String, enum: ['Single', 'Married', 'Widowed'], required: true },
  employer: { type: String, required: true },
  isStudent: { type: Boolean, required: true },
  emergencyContact: { type: String, required: true },
  emergencyPhone: { type: String, required: true },
  employmentStatus: { type: String, enum: ['Employed', 'Unemployed'], required: true },
  responsibleParty: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    relationship: { type: String, required: true }
  },
  primaryInsuarance: {
    carrier: { type: String, required: true },
    id: { type: String, required: true },
    group: { type: String, required: false },
    address: { type: String, required: true },
    subscriber: { type: String, required: true },
    relationship: { type: String, required: false },
    dateOfBirth: { type: Date, required: true },
  },
  secondaryInsuarance: {
    carrier: { type: String, required: true },
    id: { type: String, required: true },
    group: { type: String, required: false },
    address: { type: String, required: true },
    subscriber: { type: String, required: true },
    relationship: { type: String, required: false },
    dateOfBirth: { type: Date, required: true },
  }
});

// Schema for Emergency Contact / Responsible Party
const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  bio: { type: String, required: false }
});



// Models
const Medication = model('Medication', medicationSchema);
const Registration = model('Registration', registrationSchema);
const Drug = model('Drug', drugSchema);
const Contact = model('Contact', contactSchema);

export  {
  Medication,
  Registration,
  Drug,
  Contact
};
