import mongoose from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  phone: string;
  role: 'Admin' | 'BA_Manager' | 'Scope_Manager' | 'Quality_Manager' | 'Certificate_Manager';
  image?: string;
  password?: string;
  googleId?: string;
}


const UserSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, unique: true },
  phone: {type: String ,  required: true },
  role: { type: String, enum : ['Admin','BA_Manager','Scope_Manager','Quality_Manager','Certificate_Manager'], default: 'BA_Manager' },
  image:{ type: String},
  password: { type: String , select: false},
  googleId: { type: String },
},{timestamps: true});

const User = mongoose.models?.User || mongoose.model<IUser>("User", UserSchema);

export default User;
