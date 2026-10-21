import mongoose from 'mongoose';
import dns from 'dns';

// Fix for Node.js on Linux (Render) IPv6 DNS resolution issues with MongoDB SRV
try {
    dns.setDefaultResultOrder('ipv4first');
} catch (e) {
    // Ignore on environments that do not support setDefaultResultOrder
}

const connectDB = async (retryCount = 0) => {
    try {
        console.log('⏳ Connecting to MongoDB...');
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000,
        });
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.error('❌ MongoDB Atlas connection failed:', err.message);

        // In production, do NOT import devDependencies like mongodb-memory-server
        if (process.env.NODE_ENV === 'production') {
            if (retryCount < 5) {
                console.log(`⏳ Retrying MongoDB connection in 5s (attempt ${retryCount + 1}/5)...`);
                setTimeout(() => connectDB(retryCount + 1), 5000);
            } else {
                console.error('❌ Could not connect to MongoDB after 5 attempts.');
            }
            return;
        }

        // Local development fallback
        console.log('⏳ Starting In-Memory MongoDB fallback server...');
        try {
            const { MongoMemoryServer } = await import('mongodb-memory-server');
            const mongoServer = await MongoMemoryServer.create();
            const uri = mongoServer.getUri();
            console.log(`✨ In-Memory MongoDB URI: ${uri}`);
            const conn = await mongoose.connect(uri);
            console.log(`✅ Connected to In-Memory MongoDB: ${conn.connection.host}`);
        } catch (memErr) {
            console.error('❌ Failed to start In-Memory MongoDB fallback:', memErr.message);
            process.exit(1);
        }
    }
};

export default connectDB;
