import mongoose from 'mongoose';
import dns from 'dns';

// Fix for Linux container IPv6 DNS
try {
    dns.setDefaultResultOrder('ipv4first');
} catch (e) {}

// Construct direct shard seedlist dynamically from MONGO_URI without hardcoding secrets
const getDirectSeedlist = (uri) => {
    if (!uri || !uri.startsWith('mongodb+srv://')) return uri;
    try {
        const match = uri.match(/^mongodb\+srv:\/\/([^:]+):([^@]+)@([^/?]+)\/([^?]*)(\?.*)?$/);
        if (!match) return uri;
        const [, user, pass, host, db] = match;
        const domain = host.split('.').slice(1).join('.');
        return `mongodb://${user}:${pass}@ac-1htsrhq-shard-00-00.${domain}:27017,ac-1htsrhq-shard-00-01.${domain}:27017,ac-1htsrhq-shard-00-02.${domain}:27017/${db}?ssl=true&replicaSet=atlas-3xjnht-shard-0&authSource=admin&retryWrites=true&w=majority`;
    } catch {
        return uri;
    }
};

const connectDB = async (retryCount = 0) => {
    try {
        console.log('⏳ Connecting to MongoDB...');
        const uriToTry = retryCount > 0 && process.env.MONGO_URI?.startsWith('mongodb+srv://')
            ? getDirectSeedlist(process.env.MONGO_URI)
            : process.env.MONGO_URI;

        const conn = await mongoose.connect(uriToTry, {
            serverSelectionTimeoutMS: 30000,
        });
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.error('❌ MongoDB Atlas connection failed:', err.message);

        if (process.env.NODE_ENV === 'production') {
            if (retryCount === 0 && process.env.MONGO_URI?.startsWith('mongodb+srv://')) {
                console.log('⏳ Retrying with direct shard seedlist (bypassing SRV DNS)...');
                return connectDB(1);
            }
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
