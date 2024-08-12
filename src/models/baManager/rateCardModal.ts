import mongoose, { Document, Schema } from 'mongoose';

// Define TypeScript interface for RateCard
interface IRateCard extends Document {
  cb: string;
  rateCards: {
    name: string;
    initial: number;
    annual: number;
    recertification: number;
  }[];
}

const RateCardSchema = new Schema<IRateCard>({
  cb: { type: String, required: true },
  rateCards: [{
    name: { type: String, required: true, unique: true },
    initial: { type: Number, required: true },
    annual: { type: Number, required: true }, // Fixed typo from 'anunal' to 'annual'
    recertification: { type: Number, required: true } // Fixed typo from 'recirtification' to 'recertification'
  }],
}, { timestamps: true });


const RateCard = mongoose.models.RateCard || mongoose.model<IRateCard>('RateCard', RateCardSchema);

export default RateCard;
