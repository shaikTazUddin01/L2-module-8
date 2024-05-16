import { Schema, model, connect } from 'mongoose';
import Student from './seudent.interface';

const userSchema = new Schema<Student>({
  id: { type: String },
  name: {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  gender: ['male', 'female'],
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, require: true },
  emergencyContactNo: { type: String, require: true },
  bloodgroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: { type: String, require: true },
  permanentAddress: { type: String, require: true },
  guardian: {
    name: {
      fatherName: {
        type: String,
        required: true,
      },
      fatherOccupation: {
        type: String,
        required: true,
      },
      fatherContactNo: {
        type: String,
        required: true,
      },
      motherName: {
        type: String,
        required: true,
      },
      motherOccupation: {
        type: String,
        required: true,
      },
      motherContactNo: {
        type: String,
        required: true,
      },
    },
  },
  localGuardian: {
    name: { type: String, require: true },
    occupation: { type: String, require: true },
    contactNo: { type: String, require: true },
    address: { type: String, require: true },
  },
  profileImg: { type: String },
  isActive: ['active', 'blocked'],
});
