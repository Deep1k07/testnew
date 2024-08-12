import mongoose from "mongoose";

interface IClient extends Document {
  ba_manager: string; 
  name: string;
  address: string;
  scope: string;
  standard: string;
  cb_name?: string;
  ab_name?: string;
  ba_name?: string;
  drive_link?: string;
  rate?: number; // Assuming rate is a number, change if it's a string
  counrty?: string;
  employee_count?: number; // Assuming employee_count is a number, change if it's a string
  email: string;
  certificate_language: string;
  other_certificate_language: string;
  isChecked: boolean;
  isScopeVerified?: boolean;
}

const ClientSchema = new mongoose.Schema<IClient>({
  ba_manager: {type: String,required: true},
  name: { type: String, required: true },
  address: { type: String, required: true },
  scope: { type: String, required: true },
  standard: {type: String ,  required: true },
  cb_name: { type: String},
  ab_name:{ type: String},
  ba_name: { type: String },
  drive_link: { type: String },
  rate: {types: String},
  counrty: {types: String},
  employee_count: { type: String },
  email:{type: String, required: true, unique: true },
  certificate_language:{type: String, required: true },
  other_certificate_language:{type: String},
  isChecked: {type: Boolean, default: false},
  isScopeVerified: {type: Boolean, default: false}
},{timestamps: true});

const Client = mongoose.models?.Client || mongoose.model<IClient>("Client", ClientSchema);

export default Client;

