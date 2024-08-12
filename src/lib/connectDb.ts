import mongoose from 'mongoose'

let isConnected = false

const connectDb=async()=>{
  mongoose.set('strictQuery',true);
  if(!process.env.MONGODB_URI) return console.log("Already connected to MongoDB");

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("Mongoose connected!");
  } catch (error) {
    console.log(error)
  }
}

export default connectDb;