import mongoose from 'mongoose';

const MONGO_URI = process.env.VITE_MONGO_URI;

if (!MONGO_URI) {
  throw new Error('MongoDB URI is missing in environment variables.');
}

let isConnected = false; // Track connection status

export const connectDb = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    throw new Error('Database connection failed');
  }
};
