import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        console.log('⏳ Connecting to MongoDB...');
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.error('❌ MongoDB Atlas connection failed:', err.message);
        console.log('⏳ Starting In-Memory MongoDB fallback server...');
        try {
            const { MongoMemoryServer } = await import('mongodb-memory-server');
            const mongoServer = await MongoMemoryServer.create();
            const uri = mongoServer.getUri();
            console.log(`ℹ️ In-Memory MongoDB URI: ${uri}`);
            const conn = await mongoose.connect(uri);
            console.log(`✅ Connected to In-Memory MongoDB: ${conn.connection.host}`);
        } catch (memErr) {
            console.error('❌ Failed to start In-Memory MongoDB fallback:', memErr.message);
            process.exit(1);
        }
    }
};

export default connectDB;
