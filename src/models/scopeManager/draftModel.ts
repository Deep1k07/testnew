import mongoose from "mongoose";

interface IDraft extends Document {
  name: string;
  address: string;
  scope: string;
  standard: string;
  cb_name?: string;
  ab_name?: string;
  ba_name?: string;
  drive_link?: string;
  add_comments?: string;
  rate?: number; // Assuming rate is a number, change if it's a string
  country?: string;
  employee_count?: number; // Assuming employee_count is a number, change if it's a string
  flag?: string;
  iaf_code: string;
  email: string;
  ba_manager: string;
  certificate_language: string;
  other_certificate_language: string;
  isScopeModified?: Number
  scope_manager: string;
  isScopeApproved?: boolean; // true or false based on Ba Manager approved or reject
  s3DraftDocxUrl?: string;
  s3DraftPdfxUrl?: string;

}

const DraftSchema = new mongoose.Schema<IDraft>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  scope: { type: String, required: true },
  standard: {type: String ,  required: true },
  cb_name: { type: String},
  ab_name:{ type: String},
  ba_name: { type: String },
  drive_link: { type: String },
  add_comments: { type: String },
  rate: {types: String},
  country: {types: String},
  employee_count: { type: String },
  flag: { type: String },
  iaf_code: { type: String },
  email:{type: String, required: true, unique: true },
  ba_manager: {type: String, required:true},
  certificate_language: { type: String},
  other_certificate_language:{ type: String},
  isScopeModified: {type: Number, default: 0},
  scope_manager: {type: String, required: true},
  isScopeApproved: {type: Boolean, default: false},
  s3DraftDocxUrl: {type: String},
  s3DraftPdfxUrl: {type: String},
},{timestamps: true});

const Draft = mongoose.models?.Draft || mongoose.model<IDraft>("Draft", DraftSchema);

export default Draft;

