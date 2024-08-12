import mongoose from "mongoose";

interface ICertificate extends Document {
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
  qualityApprovedDate?: Date; // true or false based on
  certificate_number: string;
  initial_issue: string;
  current_issue: string;
  valid_until: string;
  first_surveillance: string;
  second_surveillance: string;
  recertification_due: string;
  revision_no: string;
  revision_date: string;
  issue_no: string;
  comment: string;
  s3DocUrl: string;
  s3PdfUrl: string;

}

const CertificateSchema = new mongoose.Schema<ICertificate>({
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
  isqualityApproved: {type: Boolean, default: false},
  qualityApprovedDate: {type: Date, default: new Date},
  certificate_number: { type: String, required: true , unique: true },
  initial_issue: { type: String, required: true },
  current_issue: { type: String, required: true },
  valid_until: { type: String, required: true },
  first_surveillance: { type: String, required: true },
  second_surveillance: { type: String, required: true },
  recertification_due: { type: String, required: true },
  revision_no: { type: String, required: true },
  revision_date: { type: String, required: true },
  issue_no: { type: String, required: true },
  comment: { type: String},
  s3DocUrl:{type: String},
  s3PdfUrl: { type: String}
},{timestamps: true});

const Certificate = mongoose.models?.Certificate || mongoose.model<ICertificate>("Certificate", CertificateSchema);

export default Certificate;

