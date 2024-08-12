import mongoose, { Document } from "mongoose";

export interface CbDocument extends Document {
  cb: string;
  ab: {
    name: string;
    standards: {
      name: string;
      code: string;
    }[];
    countrys: {
      name: string;
      code: string;
    }[];
  }[];
}

const AbSchema = new mongoose.Schema({
  name: { type: String, required: true },
  standards: [
    {
      name: { type: String, required: true },
      code: { type: String, required: true },
    },
  ],
  countrys: [
    {
      name: { type: String, required: true },
      code: { type: String, required: true },
    },
  ],
}, { _id: false }); // _id: false to avoid creating a separate _id field for the subschema

const CBSchema = new mongoose.Schema({
  cb: { type: String, required: true },
  ab: [AbSchema],
}, { timestamps: true });

const Cb = mongoose.models?.Cb || mongoose.model<CbDocument>('Cb', CBSchema);

export default Cb;