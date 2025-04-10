import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line no-undef
const MONGO_URI = process.env.MONGO_URI;

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
