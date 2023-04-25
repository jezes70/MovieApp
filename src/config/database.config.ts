import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI || 'mongodb+srv://jezes70:TBN8G3fIB5NIcXkM@cluster0.hm154wl.mongodb.net/test'

const db = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI, {
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  }
};

export default db;
