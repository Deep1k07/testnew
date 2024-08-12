import mongoose, { Document, Schema } from 'mongoose';

// Define the AbSchema with corrected field names
const AbSchema = new Schema({
  name: { type: String, required: true },
  standards: [
    {
      name: { type: String, required: true },
      code: { type: String, required: true },
      rateCard: {
        initial: { type: String },
        annual: { type: String },
        recertification: { type: String }
      }
    }
  ],
  countries: [  // Adjusted from 'country' to 'countrys'
    {
      name: { type: String },
      code: { type: String }
    }
  ]
}, { _id: false });

// Define the CB_Schema
const CB_Schema = new Schema({
  name: { type: String, required: true },
  ab: [AbSchema],
},{ _id: false });

// Define the BASchema
const BASchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true , unique: true },
  country: { type: String, required: true },
  currency: { type: String, required: true },
  gst: { type: String, required: true },
  certificate_language: { type: String, required: true },
  other_certificate_language: { type: String, required: true },
  cb: [CB_Schema],
  ba_manager: { type: Schema.Types.ObjectId, ref: 'User'}
}, { timestamps: true });

// Export the model
const BA = mongoose.models.BA || mongoose.model('BA', BASchema);

export default BA;