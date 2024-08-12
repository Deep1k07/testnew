import mongoose from "mongoose";

interface IScope extends Document {
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
  isqualityApproved?: boolean;
  isqualityReject?: boolean; // true or false based on
  qualityApprovedDate?: Date; // true or false based on
  isCertificateGenerate?: boolean; // true or false based on
}

const ScopeSchema = new mongoose.Schema<IScope>({
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
  certificate_language: { type: String, required:true},
  other_certificate_language:{ type: String, required: true},
  isScopeModified: {type: Number, default: 0},
  scope_manager: {type: String, required: true},
  isScopeApproved: {type: Boolean, default: false},
  isqualityReject: {type: Boolean, default: false},
  isqualityApproved: {type: Boolean, default: false},
  qualityApprovedDate: {type: Date, default: new Date},
  isCertificateGenerate: {type: Boolean, default: false},
},{timestamps: true});

const Scope = mongoose.models?.Scope || mongoose.model<IScope>("Scope", ScopeSchema);

export default Scope;

