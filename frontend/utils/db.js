import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = import.meta.env.VITE_MONGO_URI;
console.log('URI', MONGO_URI);

let isConnected = false;

const connectDb = async () => {
  if (isConnected) {
    return;
  }
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = true;
};

export { connectDb };
