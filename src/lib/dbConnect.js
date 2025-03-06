import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('MongoDB URI가 설정되지 않았습니다.');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts)
            .then((mongoose) => {
                console.log('MongoDB 연결 성공');
                return mongoose;
            })
            .catch((err) => {
                console.error('MongoDB 연결 오류:', err);
                throw err;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;